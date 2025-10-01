import {PortfolioError} from '@/Portfolio/domain/errors/PortfolioError';

type UpdatableProps = {
    title?: string;
    description?: string;
    technologies?: string[];
    imageUrl?: string;
    url?: string;
};

export class Portfolio {
    private readonly uuid: string;
    private readonly title: string;
    private readonly description: string;
    private readonly technologies: string[];
    private readonly imageUrl: string;
    private readonly url: string | null;

    constructor(uuid: string, title: string, description: string, technologies: string[], imageUrl: string, url: string | null = null) {
        Portfolio.validateConstructorParams(uuid, title, description, technologies, imageUrl);
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.imageUrl = imageUrl;
        this.url = url;
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

    getTechnologies() {
        return this.technologies;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    getUrl() {
        return this.url;
    }

    copyWith(updated: UpdatableProps): Portfolio {
        const next = {
            uuid: this.uuid,
            title: updated.title ?? this.title,
            description: updated.description ?? this.description,
            technologies: updated.technologies ?? this.technologies,
            imageUrl: updated.imageUrl ?? this.imageUrl,
            url: updated.url ?? this.url,
        };

        Portfolio.validateConstructorParams(
            next.uuid,
            next.title,
            next.description,
            next.technologies,
            next.imageUrl
        );

        return new Portfolio(next.uuid, next.title, next.description, next.technologies, next.imageUrl, next.url);
    }

    updateTitle(title: string): Portfolio {
        return this.copyWith({ title });
    }

    updateDescription(description: string): Portfolio {
        return this.copyWith({ description });
    }

    updateTechnologies(technologies: string[]): Portfolio {
        return this.copyWith({ technologies });
    }

    updateImageUrl(imageUrl: string): Portfolio {
        return this.copyWith({ imageUrl });
    }

    updateUrl(url: string): Portfolio {
        return this.copyWith({ url });
    }

    private static validateConstructorParams(
        uuid: string,
        title: string,
        description: string,
        technologies: string[],
        imageUrl: string
    ) {
        if (!uuid) {
            throw new PortfolioError('Uuid es requerido');
        }
        if (!title) {
            throw new PortfolioError('Title es requerido');
        }
        if (!description) {
            throw new PortfolioError('Description es requerido');
        }
        if (!technologies || technologies.length === 0) {
            throw new PortfolioError('Technologies es requerido');
        }
        if (!imageUrl) {
            throw new PortfolioError('ImageUrl es requerido');
        }
    }

    getBasicInfo() {
        return {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
            imageUrl: this.imageUrl,
            url: this.url,
        };
    }
}
