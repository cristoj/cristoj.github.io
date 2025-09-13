import InMemoryTraining from '@/Training/infraestructura/InMemoryTraining';
import { Training } from '@/Training/domain/models/Training';

const makeTraining = (id: string, title: string = 'Title') => new Training(
  id,
  title,
  'Description',
  'Madrid',
  '2025',
  '2026',
);

describe('InMemoryTraining', () => {
  let repo: InMemoryTraining;

  beforeEach(() => {
    repo = new InMemoryTraining();
  });

  it('saves and finds by id', async () => {
    const t = makeTraining('id-1');
    await repo.save(t);

    const found = await repo.findById('id-1');
    expect(found).not.toBeNull();
    expect(found!.getUuid()).toBe('id-1');
  });

  it('returns null when not found by id', async () => {
    const found = await repo.findById('missing');
    expect(found).toBeNull();
  });

  it('findAll returns all saved trainings', async () => {
    const t1 = makeTraining('id-1');
    const t2 = makeTraining('id-2', 'Another');
    await repo.save(t1);
    await repo.save(t2);

    const all = await repo.findAll();
    const ids = all.map(t => t.getUuid());
    expect(ids.sort()).toEqual(['id-1', 'id-2']);
  });

  it('updates an existing training', async () => {
    const t1 = makeTraining('id-1', 'Old');
    await repo.save(t1);

    const updated = makeTraining('id-1', 'New');
    await repo.update(updated);

    const found = await repo.findById('id-1');
    expect(found!.getTitle()).toBe('New');
  });

  it('throws when updating a non-existent training', async () => {
    const t = makeTraining('unknown');
    await expect(repo.update(t)).rejects.toThrow('Training not found');
  });

  it('deletes an existing training', async () => {
    const t1 = makeTraining('id-1');
    await repo.save(t1);

    await repo.delete('id-1');
    const found = await repo.findById('id-1');
    expect(found).toBeNull();
  });

  it('throws when deleting a non-existent training', async () => {
    await expect(repo.delete('missing')).rejects.toThrow('Training not found');
  });
});
