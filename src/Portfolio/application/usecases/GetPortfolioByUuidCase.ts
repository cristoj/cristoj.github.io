import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';
import { PortfolioError } from '@/Portfolio/domain/errors/PortfolioError';

export class GetPortfolioByUuidCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(uuid: string): Promise<Portfolio | null> {
        if (!uuid) {
            throw new PortfolioError('El uuid es requerido');
        }

        return await this.repository.findById(uuid);
    }
}
