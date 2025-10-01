import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

export class GetAllPortfoliosUseCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(): Promise<Portfolio[]> {
        return await this.repository.findAll();
    }
}
