import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

export class CreatePortfolioUseCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(portfolio: Portfolio): Promise<void> {
        // The Portfolio entity validates its own invariants in the constructor
        await this.repository.save(portfolio);
    }
}
