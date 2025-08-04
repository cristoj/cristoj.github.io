import CVDeveloper from '../../src/models/CVDeveloper';
import Locations from '../../src/models/types/Locations';
import JobCategories from '../../src/models/types/JobCategories';
import SkillCategories from '../../src/models/types/skill/SkillCategories';

describe('CVDeveloper', () => {
  let developer: CVDeveloper;

  beforeEach(() => {
    developer = new CVDeveloper(
      'test-uuid',
      'Test Developer',
      'developer@example.com',
      '+34123456789',
      [Locations.ACORUNA, Locations.REMOTO],
      'Full-Stack Developer',
      'https://linkedin.com/test-dev',
      'https://github.com/test-dev'
    );
  });

  describe('constructor', () => {
    it('should create a CVDeveloper instance with correct values', () => {
      const basicInfo = developer.getBasicInfo();

      expect(basicInfo.fullName).toBe('Test Developer');
      expect(basicInfo.email).toBe('developer@example.com');
      expect(basicInfo.phone).toBe('+34 123 456 789');
      expect(basicInfo.locations).toEqual([Locations.ACORUNA, Locations.REMOTO]);
      expect(basicInfo.specialty).toBe('Full-Stack Developer');
      expect(basicInfo.linkedin).toBe('https://linkedin.com/test-dev');
      expect(basicInfo.github).toBe('https://github.com/test-dev');
      expect(basicInfo.jobCategories).toBe(JobCategories.DEVELOPER);
    });
  });

  describe('skills management', () => {
    it('should allow adding skills to a developer', () => {
      developer.addSkill(SkillCategories.LANGUAGES, 'TypeScript');
      developer.addSkills(SkillCategories.FRAMEWORKS, ['React', 'Angular']);

      const skills = developer.getSkills();

      expect(skills[SkillCategories.LANGUAGES]).toContain('TypeScript');
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('React');
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('Angular');
    });

    it('should inherit skill management functionality from parent class', () => {
      // Add a skill
      developer.addSkill(SkillCategories.LANGUAGES, 'JavaScript');

      // Try to add it again (should be ignored)
      developer.addSkill(SkillCategories.LANGUAGES, 'JavaScript');

      const skills = developer.getSkills();
      expect(skills[SkillCategories.LANGUAGES].filter(skill => skill === 'JavaScript').length).toBe(1);
    });
  });

  describe('inheritance', () => {
    it('should be an instance of CVDeveloper', () => {
      expect(developer).toBeInstanceOf(CVDeveloper);
    });

    it('should have the correct job category set', () => {
      expect(developer.getBasicInfo().jobCategories).toBe(JobCategories.DEVELOPER);
    });
  });
});
