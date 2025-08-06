import PortfolioRepository from '@/Porfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Porfolio/domain/models/Portfolio';

export class UpdatePortfolioUseCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(portfolio: Portfolio): Promise<void> {
        await this.repository.update(portfolio);
    }
}
