import { GetPortfolioByUuidCase } from '@/Porfolio/application/usecases/GetPortfolioByUuidCase';
import PortfolioRepository from '@/Porfolio/domain/ports/PortfolioRepository';
import { Portfolio } from '@/Porfolio/domain/models/Portfolio';
import { PortfolioError } from '@/Porfolio/domain/errors/PortfolioError';

describe('GetPortfolioByIdUseCase', () => {
  let repository: jest.Mocked<PortfolioRepository>;
  let useCase: GetPortfolioByUuidCase;
  let portfolio: Portfolio;
  const uuid = 'uuid-123';

  beforeEach(() => {
    portfolio = new Portfolio(
      uuid,
      'Title',
      'Desc',
      ['TS'],
      'img',
      'url'
    );

    repository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockResolvedValue(portfolio),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new GetPortfolioByUuidCase(repository);
  });

  it('should return a portfolio by uuid', async () => {
    const result = await useCase.execute(uuid);
    expect(repository.findById).toHaveBeenCalledWith(uuid);
    expect(result).toBe(portfolio);
  });

  it('should return null when not found', async () => {
    repository.findById.mockResolvedValue(null);
    const result = await useCase.execute(uuid);
    expect(result).toBeNull();
  });

  it('should throw PortfolioError when uuid is empty', async () => {
    await expect(useCase.execute('')).rejects.toThrow(PortfolioError);
    expect(repository.findById).not.toHaveBeenCalled();
  });

  it('should propagate repository errors', async () => {
    const expectedError = new Error('Database error');
    repository.findById.mockRejectedValue(expectedError);
    await expect(useCase.execute(uuid)).rejects.toThrow('Database error');
  });
});
