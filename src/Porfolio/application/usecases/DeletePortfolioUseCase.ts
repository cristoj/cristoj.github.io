import PortfolioRepository from '@/Porfolio/domain/ports/PortfolioRepository';
import { PortfolioError } from '@/Porfolio/domain/errors/PortfolioError';

export class DeletePortfolioUseCase {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(uuid: string): Promise<void> {
        if (!uuid) {
            throw new PortfolioError('El uuid es requerido');
        }

        await this.repository.delete(uuid);
    }
}
