import { UpdatePortfolioUseCase } from '@/Portfolio/application/usecases/UpdatePortfolioUseCase';
import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

describe('UpdatePortfolioUseCase', () => {
  let repository: jest.Mocked<PortfolioRepository>;
  let useCase: UpdatePortfolioUseCase;
  let portfolio: Portfolio;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    };

    portfolio = new Portfolio(
      'uuid-1',
      'My Project',
      'A cool project',
      ['TypeScript', 'Node.js'],
      'https://example.com/image.png',
      'https://example.com'
    );

    useCase = new UpdatePortfolioUseCase(repository);
  });

  it('should update a portfolio', async () => {
    await useCase.execute(portfolio);
    expect(repository.update).toHaveBeenCalledWith(portfolio);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });

  it('should propagate repository errors', async () => {
    const expectedError = new Error('Database error');
    repository.update.mockRejectedValue(expectedError);

    await expect(useCase.execute(portfolio)).rejects.toThrow('Database error');
    expect(repository.update).toHaveBeenCalledWith(portfolio);
  });
});
