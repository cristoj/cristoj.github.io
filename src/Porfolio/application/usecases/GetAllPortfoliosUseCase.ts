import PortfolioRepository from '@/Porfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Porfolio/domain/models/Portfolio';

export class GetAllPortfoliosUseCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(): Promise<Portfolio[]> {
        return await this.repository.findAll();
    }
}
