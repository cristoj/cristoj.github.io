import { GetAllPortfoliosUseCase } from '@/Portfolio/application/usecases/GetAllPortfoliosUseCase';
import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';

describe('GetAllPortfoliosUseCase', () => {
  let repository: jest.Mocked<PortfolioRepository>;
  let useCase: GetAllPortfoliosUseCase;
  let portfolio: Portfolio;

  beforeEach(() => {
    portfolio = new Portfolio(
      'uuid',
      'Title',
      'Desc',
      ['TS'],
      'img',
      'url'
    );

    repository = {
      save: jest.fn(),
      findAll: jest.fn().mockResolvedValue([portfolio]),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new GetAllPortfoliosUseCase(repository);
  });

  it('should return all portfolios', async () => {
    const result = await useCase.execute();
    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toEqual([portfolio]);
  });

  it('should return empty list when none found', async () => {
    repository.findAll.mockResolvedValue([]);
    const result = await useCase.execute();
    expect(result).toEqual([]);
  });

  it('should propagate repository errors', async () => {
    const expectedError = new Error('Database error');
    repository.findAll.mockRejectedValue(expectedError);
    await expect(useCase.execute()).rejects.toThrow('Database error');
  });
});
