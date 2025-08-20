import {Portfolio} from "@/Porfolio/domain/models/Portfolio";

// DTO representing the serialized form of Portfolio
export type PortfolioDTO = {
    uuid: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    url: string | null;
};

export default class PortfolioMapper {
    /**
     * Converts a Portfolio domain object to a JSON string
     */
    static toJson(portfolio: Portfolio): string {
        const dto: PortfolioDTO = {
            uuid: portfolio.getUuid(),
            title: portfolio.getTitle(),
            description: portfolio.getDescription(),
            technologies: portfolio.getTechnologies(),
            imageUrl: portfolio.getImageUrl(),
            url: portfolio.getUrl()
        };

        return JSON.stringify(dto);
    }

    /**
     * Builds a Portfolio domain object from a JSON string
     */
    static fromJson(json: string): Portfolio {
        const data: PortfolioDTO = JSON.parse(json);

        return new Portfolio(
            data.uuid,
            data.title,
            data.description,
            data.technologies,
            data.imageUrl,
            data.url
        );
    }
}
