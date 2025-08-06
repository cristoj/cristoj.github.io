import {PortfolioError} from '@/Porfolio/domain/errors/PortfolioError';

export class Portfolio {
    uuid: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    url?: string | undefined;

    constructor(uuid: string, title: string, description: string, technologies: string[], imageUrl: string, url?: string) {
        Portfolio.validateConstructorParams(uuid, title, description, technologies, imageUrl);
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.imageUrl = imageUrl;
        this.url = url;
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

    }


}
