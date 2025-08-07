import { GetCurriculumVitaeUseCase } from '@/CurriculumVitae/application/usescases/GetCurriculumVitaeUseCase';
import { CurriculumVitaeRepository } from '@/CurriculumVitae/domain/ports/CurriculumVitaeRepository';
import CurriculumVitae from '@/CurriculumVitae/domain/models/CurriculumVitae';
import JobCategories from '@/CurriculumVitae/domain/value-objects/JobCategories';

// Mock the CurriculumVitae abstract class
jest.mock('@/CurriculumVitae/domain/models/CurriculumVitae');

describe('GetCurriculumVitaeUseCase', () => {
  let repository: jest.Mocked<CurriculumVitaeRepository>;
  let useCase: GetCurriculumVitaeUseCase;
  let mockCV: jest.Mocked<CurriculumVitae>;
  const testUuid = 'test-uuid-123';

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
      getUuid: jest.fn().mockReturnValue(testUuid)
    } as unknown as jest.Mocked<CurriculumVitae>;

    // Create mock repository
    repository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(mockCV),
      findAll: jest.fn().mockResolvedValue([mockCV]),
      update: jest.fn(),
      delete: jest.fn()
    };

    // Create use case with mock repository
    useCase = new GetCurriculumVitaeUseCase(repository);
  });

  describe('getById', () => {
    it('should return a curriculum vitae by uuid', async () => {
      // Act
      const result = await useCase.getById(testUuid);

      // Assert
      expect(repository.findById).toHaveBeenCalledWith(testUuid);
      expect(result).toBe(mockCV);
    });

    it('should return null when curriculum vitae is not found', async () => {
      // Arrange
      repository.findById.mockResolvedValue(null);

      // Act
      const result = await useCase.getById(testUuid);

      // Assert
      expect(repository.findById).toHaveBeenCalledWith(testUuid);
      expect(result).toBeNull();
    });

    it('should handle repository errors', async () => {
      // Arrange
      const expectedError = new Error('Database error');
      repository.findById.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(useCase.getById(testUuid)).rejects.toThrow('Database error');
      expect(repository.findById).toHaveBeenCalledWith(testUuid);
    });
  });

  describe('getAll', () => {
    it('should return all curriculum vitae', async () => {
      // Act
      const result = await useCase.getAll();

      // Assert
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCV]);
    });

    it('should return empty array when no curriculum vitae found', async () => {
      // Arrange
      repository.findAll.mockResolvedValue([]);

      // Act
      const result = await useCase.getAll();

      // Assert
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      // Arrange
      const expectedError = new Error('Database error');
      repository.findAll.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(useCase.getAll()).rejects.toThrow('Database error');
      expect(repository.findAll).toHaveBeenCalled();
    });
  });
});
