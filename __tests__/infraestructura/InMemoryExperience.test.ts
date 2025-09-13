import InMemoryExperience from '@/Experience/infraestructura/InMemoryExperience';
import {Experience} from '@/Experience/domain/models/Experience';

const makeExperience = (id: string, title: string = 'Title') => new Experience(
    id,
    title,
    'Description',
    'Skill',
    '2024',
    'image.png'
);

describe('InMemoryExperience', () => {
    let repo: InMemoryExperience;

    beforeEach(() => {
        repo = new InMemoryExperience();
    });

    it('saves and finds by id', async () => {
        const p = makeExperience('id-1');
        await repo.save(p);

        const found = await repo.findById('id-1');
        expect(found).not.toBeNull();
        expect(found!.getUuid()).toBe('id-1');
    });

    it('returns null when not found by id', async () => {
        const found = await repo.findById('missing');
        expect(found).toBeNull();
    });

    it('findAll returns all saved experiences', async () => {
        const p1 = makeExperience('id-1');
        const p2 = makeExperience('id-2', 'Another');
        await repo.save(p1);
        await repo.save(p2);

        const all = await repo.findAll();
        const ids = all.map(p => p.getUuid());
        expect(ids.sort()).toEqual(['id-1', 'id-2']);
    });

    it('updates an existing experience', async () => {
        const p1 = makeExperience('id-1', 'Old');
        await repo.save(p1);

        const updated = makeExperience('id-1', 'New');
        await repo.update(updated);

        const found = await repo.findById('id-1');
        expect(found!.getTitle()).toBe('New');
    });

    it('throws when updating a non-existent experience', async () => {
        const p = makeExperience('unknown');
        await expect(repo.update(p)).rejects.toThrow('Experience not found');
    });

    it('deletes an existing experience', async () => {
        const p1 = makeExperience('id-1');
        await repo.save(p1);

        await repo.delete('id-1');
        const found = await repo.findById('id-1');
        expect(found).toBeNull();
    });

    it('throws when deleting a non-existent experience', async () => {
        await expect(repo.delete('missing')).rejects.toThrow('Experience not found');
    });
});
