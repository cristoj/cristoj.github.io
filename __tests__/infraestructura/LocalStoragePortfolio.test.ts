import LocalStoragePortfolio from '@/Portfolio/infraestructura/LocalStoragePortfolio';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

const STORAGE_KEY = 'portfolio';

const makePortfolio = (id: string, title: string = 'Title') => new Portfolio(
  id,
  title,
  'Description',
  ['TS'],
  'img',
  'url'
);

describe('LocalStoragePortfolio', () => {
  let repo: LocalStoragePortfolio;
  let store: Record<string, string>;

  beforeEach(() => {
    // Fresh in-memory store for each test
    store = {};
    const localStorageMock = {
      getItem: jest.fn((key: string) => (key in store ? store[key] : null)),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      })
    } as any;

    (global as any).window = { localStorage: localStorageMock } as any;
    (global as any).localStorage = localStorageMock as any;

    // Create repository (constructor should initialize empty object under STORAGE_KEY)
    repo = new LocalStoragePortfolio();
  });

  it('initializes storage key on constructor', () => {
    const raw = (global as any).localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect(() => JSON.parse(raw as string)).not.toThrow();
    expect(JSON.parse(raw as string)).toEqual({});
  });

  it('saves and finds by id', async () => {
    const p = makePortfolio('id-1');
    await repo.save(p);

    const found = await repo.findById('id-1');
    expect(found).not.toBeNull();
    expect(found!.getUuid()).toBe('id-1');
  });

  it('returns null when not found by id', async () => {
    const found = await repo.findById('missing');
    expect(found).toBeNull();
  });

  it('findAll returns all saved portfolios', async () => {
    const p1 = makePortfolio('id-1');
    const p2 = makePortfolio('id-2', 'Another');
    await repo.save(p1);
    await repo.save(p2);

    const all = await repo.findAll();
    const ids = all.map(p => p.getUuid());
    expect(ids.sort()).toEqual(['id-1', 'id-2']);
  });

  it('updates an existing portfolio', async () => {
    const p1 = makePortfolio('id-1', 'Old');
    await repo.save(p1);

    const updated = makePortfolio('id-1', 'New');
    await repo.update(updated);

    const found = await repo.findById('id-1');
    expect(found!.getTitle()).toBe('New');
  });

  it('throws when updating a non-existent portfolio', async () => {
    const p = makePortfolio('unknown');
    await expect(repo.update(p)).rejects.toThrow('Portfolio not found');
  });

  it('deletes an existing portfolio', async () => {
    const p1 = makePortfolio('id-1');
    await repo.save(p1);

    await repo.delete('id-1');
    const found = await repo.findById('id-1');
    expect(found).toBeNull();
  });

  it('throws when deleting a non-existent portfolio', async () => {
    await expect(repo.delete('missing')).rejects.toThrow('Portfolio not found');
  });
});
