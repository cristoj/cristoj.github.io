import InMemoryPortfolio from '@/Portfolio/infraestructura/InMemoryPortfolio';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

const makePortfolio = (id: string, title: string = 'Title') => new Portfolio(
  id,
  title,
  'Description',
  ['TS'],
  'img',
  'url'
);

describe('InMemoryPortfolio', () => {
  let repo: InMemoryPortfolio;

  beforeEach(() => {
    repo = new InMemoryPortfolio();
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
