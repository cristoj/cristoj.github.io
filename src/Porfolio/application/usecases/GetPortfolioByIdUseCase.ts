import PortfolioRepository from '@/Porfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Porfolio/domain/models/Portfolio';
import { PortfolioError } from '@/Porfolio/domain/errors/PortfolioError';

export class GetPortfolioByIdUseCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(uuid: string): Promise<Portfolio | null> {
        if (!uuid) {
            throw new PortfolioError('El uuid es requerido');
        }

        return await this.repository.findById(uuid);
    }
}
