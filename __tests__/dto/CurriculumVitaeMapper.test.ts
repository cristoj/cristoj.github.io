import CurriculumVitaeMapper from '@/CurriculumVitae/domain/mappers/CurriculumVitaeMapper';
import CVDeveloper from '@/CurriculumVitae/domain/models/CVDeveloper';
import Locations from '@/_shared/domain/Locations';
import SkillCategories from '@/CurriculumVitae/domain/value-objects/skill/SkillCategories';

// Create a concrete implementation of the abstract class for testing
class TestCurriculumVitae extends CVDeveloper {
  constructor(
    uuid: string,
    fullName: string,
    email: string,
    phone: string,
    locations: Locations[] = [Locations.REMOTO],
    specialty: string,
    linkedin: string,
    github: string,
  ) {
    super(uuid, fullName, email, phone, locations, specialty, linkedin, github);
  }
}

describe('CurriculumVitaeMapper', () => {
  describe('toJson', () => {
    it('should convert a CurriculumVitae object to JSON string with type information', () => {
      // Arrange
      const cv = new CVDeveloper(
        'test-uuid',
        'Test Name',
        'test@example.com',
        '+34123456789',
        [Locations.ACORUNA, Locations.REMOTO],
        'Test Specialty',
        'https://linkedin.com/test',
        'https://github.com/test'
      );
      cv.addSkill(SkillCategories.LANGUAGES, 'JavaScript');

      // Act
      const json = CurriculumVitaeMapper.toJson(cv);
      const data = JSON.parse(json);

      // Assert
      expect(data.type).toBe('CVDeveloper');
      expect(data.uuid).toBe('test-uuid');
      expect(data.basicInfo.fullName).toBe('Test Name');
      expect(data.skills.languages).toContain('JavaScript');
    });

    it('should include the correct type for different CurriculumVitae implementations', () => {
      // Arrange
      const cv = new TestCurriculumVitae(
        'test-uuid',
        'Test Name',
        'test@example.com',
        '+34123456789',
        [Locations.ACORUNA, Locations.REMOTO],
        'Test Specialty',
        'https://linkedin.com/test',
        'https://github.com/test'
      );

      // Act
      const json = CurriculumVitaeMapper.toJson(cv);
      const data = JSON.parse(json);

      // Assert
      expect(data.type).toBe('TestCurriculumVitae');
    });
  });

  describe('fromJson', () => {
    it('should convert a JSON string to a CVDeveloper object when type is CVDeveloper', () => {
      // Arrange
      const jsonData = {
        type: 'CVDeveloper',
        uuid: 'test-uuid',
        basicInfo: {
          fullName: 'Test Name',
          email: 'test@example.com',
          phone: '+34 123 456 789',
          locations: [Locations.ACORUNA, Locations.REMOTO],
          specialty: 'Test Specialty',
          linkedin: 'https://linkedin.com/test',
          github: 'https://github.com/test',
          jobCategories: 'DEVELOPER'
        },
        skills: {
          languages: ['JavaScript'],
          frameworks: [],
          tools: [],
          methodologies: [],
          cloud: [],
          softSkills: []
        }
      };
      const json = JSON.stringify(jsonData);

      // Act
      const cv = CurriculumVitaeMapper.fromJson(json);

      // Assert
      expect(cv.constructor.name).toBe('CVDeveloper');
      expect(cv.getUuid()).toBe('test-uuid');
      expect(cv.getBasicInfo().fullName).toBe('Test Name');
      expect(cv.getSkills()[SkillCategories.LANGUAGES]).toContain('JavaScript');
    });

    it('should default to CVDeveloper when type is not recognized', () => {
      // Arrange
      const jsonData = {
        type: 'UnknownType',
        uuid: 'test-uuid',
        basicInfo: {
          fullName: 'Test Name',
          email: 'test@example.com',
          phone: '+34 123 456 789',
          locations: [Locations.ACORUNA, Locations.REMOTO],
          specialty: 'Test Specialty',
          linkedin: 'https://linkedin.com/test',
          github: 'https://github.com/test',
          jobCategories: 'DEVELOPER'
        },
        skills: {
          languages: ['JavaScript'],
          frameworks: [],
          tools: [],
          methodologies: [],
          cloud: [],
          softSkills: []
        }
      };
      const json = JSON.stringify(jsonData);

      // Act
      const cv = CurriculumVitaeMapper.fromJson(json);

      // Assert
      expect(cv.constructor.name).toBe('CVDeveloper');
    });
  });
});
