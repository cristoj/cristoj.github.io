import { DeleteCurriculumVitaeUseCase } from '@/CurriculumVitae/application/usescases/DeleteCurriculumVitaeUseCase';
import { CurriculumVitaeRepository } from '@/CurriculumVitae/domain/ports/CurriculumVitaeRepository';

describe('DeleteCurriculumVitaeUseCase', () => {
  let repository: jest.Mocked<CurriculumVitaeRepository>;
  let useCase: DeleteCurriculumVitaeUseCase;
  const testUuid = 'test-uuid-123';

  beforeEach(() => {
    // Create mock repository
    repository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined)
    };

    // Create use case with mock repository
    useCase = new DeleteCurriculumVitaeUseCase(repository);
  });

  it('should delete a curriculum vitae by uuid', async () => {
    // Act
    await useCase.execute(testUuid);

    // Assert
    expect(repository.delete).toHaveBeenCalledWith(testUuid);
    expect(repository.delete).toHaveBeenCalledTimes(1);
  });

  it('should handle repository errors', async () => {
    // Arrange
    const expectedError = new Error('Database error');
    repository.delete.mockRejectedValue(expectedError);

    // Act & Assert
    await expect(useCase.execute(testUuid)).rejects.toThrow('Database error');
    expect(repository.delete).toHaveBeenCalledWith(testUuid);
  });

  it('should handle empty uuid', async () => {
    // Act
    await useCase.execute('');

    // Assert
    expect(repository.delete).toHaveBeenCalledWith('');
    expect(repository.delete).toHaveBeenCalledTimes(1);
  });
});
