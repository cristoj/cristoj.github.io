import { DeletePortfolioUseCase } from '@/Porfolio/application/usecases/DeletePortfolioUseCase';
import PortfolioRepository from '@/Porfolio/domain/ports/PortfolioRepository';
import { PortfolioError } from '@/Porfolio/domain/errors/PortfolioError';

describe('DeletePortfolioUseCase', () => {
  let repository: jest.Mocked<PortfolioRepository>;
  let useCase: DeletePortfolioUseCase;
  const uuid = 'uuid-1';

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    useCase = new DeletePortfolioUseCase(repository);
  });

  it('should delete a portfolio by uuid', async () => {
    await useCase.execute(uuid);
    expect(repository.delete).toHaveBeenCalledWith(uuid);
    expect(repository.delete).toHaveBeenCalledTimes(1);
  });

  it('should propagate repository errors', async () => {
    const expectedError = new Error('Database error');
    repository.delete.mockRejectedValue(expectedError);
    await expect(useCase.execute(uuid)).rejects.toThrow('Database error');
    expect(repository.delete).toHaveBeenCalledWith(uuid);
  });

  it('should throw PortfolioError when uuid is empty', async () => {
    await expect(useCase.execute('')).rejects.toThrow(PortfolioError);
    expect(repository.delete).not.toHaveBeenCalled();
  });
});
