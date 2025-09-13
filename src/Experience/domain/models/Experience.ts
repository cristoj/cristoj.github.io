import {ExperienceError} from '@/Experience/domain/errors/ExperienceError';

export type ExperienceUpdatableProps = {
    title?: string;
    description?: string;
    skills?: string;
    date?: string;
    logoPath?: string;
};

export class Experience {
    private readonly uuid: string;
    private readonly title: string;
    private readonly description: string;
    private readonly skills: string;
    private readonly date: string;
    private readonly logoPath: string;

    constructor(
        uuid: string,
        title: string,
        description: string,
        skills: string,
        date: string,
        logoPath: string
    ) {
        Experience.validateConstructorParams(uuid, title, description, skills, date, logoPath);
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.skills = skills;
        this.date = date;
        this.logoPath = logoPath;
    }

    getUuid() {
        return this.uuid;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getSkills() {
        return this.skills;
    }

    getDate() {
        return this.date;
    }

    getLogoPath() {
        return this.logoPath;
    }

    copyWith(updated: ExperienceUpdatableProps): Experience {
        const next = {
            uuid: this.uuid,
            title: updated.title ?? this.title,
            description: updated.description ?? this.description,
            skills: updated.skills ?? this.skills,
            date: updated.date ?? this.date,
            logoPath: updated.logoPath ?? this.logoPath,
        };

        Experience.validateConstructorParams(
            next.uuid,
            next.title,
            next.description,
            next.skills,
            next.date,
            next.logoPath
        );

        return new Experience(
            next.uuid,
            next.title,
            next.description,
            next.skills,
            next.date,
            next.logoPath
        );
    }

    private static validateConstructorParams(
        uuid: string,
        title: string,
        description: string,
        skills: string,
        date: string,
        logoPath: string
    ) {
        if (!uuid) {
            throw new ExperienceError('Uuid es requerido');
        }
        if (!title) {
            throw new ExperienceError('Title es requerido');
        }
        if (!description) {
            throw new ExperienceError('Description es requerido');
        }
        if (!skills) {
            throw new ExperienceError('Skills es requerido');
        }
        if (!date) {
            throw new ExperienceError('Date es requerido');
        }
        if (!logoPath) {
            throw new ExperienceError('LogoPath es requerido');
        }
    }

    getBasicInfo() {
        return {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
            skills: this.skills,
            date: this.date,
        };
    }
}
