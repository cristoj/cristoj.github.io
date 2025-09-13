import ExperienceMapper, {ExperienceDTO} from '@/Experience/domain/mappers/ExperienceMapper';
import {Experience} from '@/Experience/domain/models/Experience';
import {ExperienceError} from '@/Experience/domain/errors/ExperienceError';

describe('ExperienceMapper', () => {
    const baseDto: ExperienceDTO = {
        uuid: 'e-123',
        title: 'My Experience',
        description: 'A role doing things',
        skills: 'TS',
        date: '2024',
        logoPath: 'image.png'
    };

    it('should convert Experience to JSON string and back', () => {
        const experience = new Experience(
            baseDto.uuid,
            baseDto.title,
            baseDto.description,
            baseDto.skills,
            baseDto.date,
            baseDto.logoPath
        );

        const json = ExperienceMapper.toJson(experience);
        const parsed = JSON.parse(json);

        expect(parsed).toEqual(baseDto);

        const restored = ExperienceMapper.fromJson(json);
        expect(restored.getUuid()).toBe(baseDto.uuid);
        expect(restored.getTitle()).toBe(baseDto.title);
        expect(restored.getDescription()).toBe(baseDto.description);
        expect(restored.getSkills()).toEqual(baseDto.skills);
        expect(restored.getDate()).toBe(baseDto.date);
    });

    it('should throw ExperienceError when required fields are missing', () => {
        const invalid: any = {...baseDto, title: ''}; // title missing
        const json = JSON.stringify(invalid);

        expect(() => ExperienceMapper.fromJson(json)).toThrow(ExperienceError);
    });
});
