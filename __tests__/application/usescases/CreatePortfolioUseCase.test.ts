import { CreatePortfolioUseCase } from '@/Portfolio/application/usecases/CreatePortfolioUseCase';
import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

describe('CreatePortfolioUseCase', () => {
  let repository: jest.Mocked<PortfolioRepository>;
  let useCase: CreatePortfolioUseCase;
  let portfolio: Portfolio;

  beforeEach(() => {
    repository = {
      save: jest.fn().mockResolvedValue(undefined),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
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

    useCase = new CreatePortfolioUseCase(repository);
  });

  it('should save a valid portfolio', async () => {
    await useCase.execute(portfolio);
    expect(repository.save).toHaveBeenCalledWith(portfolio);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('should propagate repository errors', async () => {
    const expectedError = new Error('Database error');
    repository.save.mockRejectedValue(expectedError);

    await expect(useCase.execute(portfolio)).rejects.toThrow('Database error');
    expect(repository.save).toHaveBeenCalledWith(portfolio);
  });
});
