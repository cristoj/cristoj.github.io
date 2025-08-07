import { UpdateCurriculumVitaeUseCase } from '@/CurriculumVitae/application/usescases/UpdateCurriculumVitaeUseCase';
import { CurriculumVitaeRepository } from '@/CurriculumVitae/domain/ports/CurriculumVitaeRepository';
import CurriculumVitae from '@/CurriculumVitae/domain/models/CurriculumVitae';
import JobCategories from '@/CurriculumVitae/domain/value-objects/JobCategories';

// Mock the CurriculumVitae abstract class
jest.mock('@/CurriculumVitae/domain/models/CurriculumVitae');

describe('UpdateCurriculumVitaeUseCase', () => {
  let repository: jest.Mocked<CurriculumVitaeRepository>;
  let useCase: UpdateCurriculumVitaeUseCase;
  let mockCV: jest.Mocked<CurriculumVitae>;

  beforeEach(() => {
    // Create mock CV
    mockCV = {
      getBasicInfo: jest.fn().mockReturnValue({
        email: 'test@example.com',
        fullName: 'Test User',
        phone: '123456789',
        locations: [],
        specialty: 'Developer',
        linkedin: 'https://linkedin.com/in/test',
        github: 'https://github.com/test',
        jobCategories: JobCategories.DEVELOPER
      }),
      getUuid: jest.fn().mockReturnValue('test-uuid')
    } as unknown as jest.Mocked<CurriculumVitae>;

    // Create mock repository
    repository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn()
    };

    // Create use case with mock repository
    useCase = new UpdateCurriculumVitaeUseCase(repository);
  });

  it('should update a curriculum vitae', async () => {
    // Act
    await useCase.update(mockCV);

    // Assert
    expect(repository.update).toHaveBeenCalledWith(mockCV);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });

  it('should handle repository errors', async () => {
    // Arrange
    const expectedError = new Error('Database error');
    repository.update.mockRejectedValue(expectedError);

    // Act & Assert
    await expect(useCase.update(mockCV)).rejects.toThrow('Database error');
    expect(repository.update).toHaveBeenCalledWith(mockCV);
  });
});
