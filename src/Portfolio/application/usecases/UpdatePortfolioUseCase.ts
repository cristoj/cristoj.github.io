import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

export class UpdatePortfolioUseCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(portfolio: Portfolio): Promise<void> {
        await this.repository.update(portfolio);
    }
}
