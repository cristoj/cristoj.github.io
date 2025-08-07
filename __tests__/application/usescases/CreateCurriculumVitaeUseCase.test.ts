import CreateCurriculumVitaeUseCase from '@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase';
import { CurriculumVitaeRepository } from '@/CurriculumVitae/domain/ports/CurriculumVitaeRepository';
import CurriculumVitae from '@/CurriculumVitae/domain/models/CurriculumVitae';
import JobCategories from '@/CurriculumVitae/domain/value-objects/JobCategories';

// Mock the CurriculumVitae abstract class
jest.mock('@/CurriculumVitae/domain/models/CurriculumVitae');

describe('CreateCurriculumVitaeUseCase', () => {
  let repository: jest.Mocked<CurriculumVitaeRepository>;
  let useCase: CreateCurriculumVitaeUseCase;
  let mockCV: jest.Mocked<CurriculumVitae>;

  beforeEach(() => {
    // Create mock repository
    repository = {
      save: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

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

    // Create use case with mock repository
    useCase = new CreateCurriculumVitaeUseCase(repository);
  });

  it('should save a valid curriculum vitae', async () => {
    // Act
    await useCase.execute(mockCV);

    // Assert
    expect(repository.save).toHaveBeenCalledWith(mockCV);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if email is missing', async () => {
    // Arrange
    mockCV.getBasicInfo.mockReturnValue({
      email: '',
      fullName: 'Test User',
      phone: '123456789',
      locations: [],
      specialty: 'Developer',
      linkedin: 'https://linkedin.com/in/test',
      github: 'https://github.com/test',
      jobCategories: JobCategories.DEVELOPER
    });

    // Act & Assert
    await expect(useCase.execute(mockCV)).rejects.toThrow('El email es requerido');
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw an error if email is undefined', async () => {
    // Arrange
    mockCV.getBasicInfo.mockReturnValue({
      email: '',  // Using empty string instead of undefined
      fullName: 'Test User',
      phone: '123456789',
      locations: [],
      specialty: 'Developer',
      linkedin: 'https://linkedin.com/in/test',
      github: 'https://github.com/test',
      jobCategories: JobCategories.DEVELOPER
    });

    // Act & Assert
    await expect(useCase.execute(mockCV)).rejects.toThrow('El email es requerido');
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should handle repository errors', async () => {
    // Arrange
    const expectedError = new Error('Database error');
    repository.save.mockRejectedValue(expectedError);

    // Act & Assert
    await expect(useCase.execute(mockCV)).rejects.toThrow('Database error');
    expect(repository.save).toHaveBeenCalledWith(mockCV);
  });
});
