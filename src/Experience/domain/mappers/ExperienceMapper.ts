import {Experience} from '@/Experience/domain/models/Experience';

export type ExperienceDTO = {
    uuid: string;
    title: string;
    description: string;
    skills: string;
    date: string;
    logoPath: string;
};

export default class ExperienceMapper {
    static toJson(experience: Experience): string {
        const dto: ExperienceDTO = {
            uuid: experience.getUuid(),
            title: experience.getTitle(),
            description: experience.getDescription(),
            skills: experience.getSkills(),
            date: experience.getDate(),
            logoPath: experience.getLogoPath(),
        };
        return JSON.stringify(dto);
    }

    static fromJson(json: string): Experience {
        const data: ExperienceDTO = JSON.parse(json);
        return new Experience(
            data.uuid,
            data.title,
            data.description,
            data.skills,
            data.date,
            data.logoPath,
        );
    }
}
