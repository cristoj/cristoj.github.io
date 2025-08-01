import CurriculumVitae from '../../models/CurriculumVitae';
import SkillCategories from '../../models/skill/SkillCategories';
import Locations from '../../models/types/Locations';
import JobCategories from '../../models/types/JobCategories';

// Create a concrete implementation of the abstract class for testing
class TestCurriculumVitae extends CurriculumVitae {
  constructor(
    uuid: string,
    fullName: string,
    email: string,
    phone: string,
    locations: Locations[] = [Locations.REMOTO],
    specialty: string,
    linkedin: string,
    github: string,
    jobCategories: JobCategories = JobCategories.OTHER
  ) {
    super(uuid, fullName, email, phone, locations, specialty, linkedin, github, jobCategories);
  }

  override addExperience() {
    // Implementation for testing
  }
}

describe('CurriculumVitae', () => {
  let cv: TestCurriculumVitae;

  beforeEach(() => {
    cv = new TestCurriculumVitae(
      'test-uuid',
      'Test Name',
      'test@example.com',
      '+34123456789',
      [Locations.ACORUNA, Locations.REMOTO],
      'Test Specialty',
      'https://linkedin.com/test',
      'https://github.com/test',
      JobCategories.DEVELOPER
    );
  });

  describe('getBasicInfo', () => {
    it('should return the correct basic information', () => {
      const basicInfo = cv.getBasicInfo();

      expect(basicInfo.fullName).toBe('Test Name');
      expect(basicInfo.email).toBe('test@example.com');
      expect(basicInfo.phone).toBe('+34 123 456 789'); // Phone should be formatted
      expect(basicInfo.locations).toEqual([Locations.ACORUNA, Locations.REMOTO]);
      expect(basicInfo.specialty).toBe('Test Specialty');
      expect(basicInfo.linkedin).toBe('https://linkedin.com/test');
      expect(basicInfo.github).toBe('https://github.com/test');
      expect(basicInfo.jobCategories).toBe(JobCategories.DEVELOPER);
    });
  });

  describe('addSkill', () => {
    it('should add a skill to the specified category', () => {
      cv.addSkill(SkillCategories.LANGUAGES, 'JavaScript');

      const skills = cv.getSkills();
      expect(skills[SkillCategories.LANGUAGES]).toContain('JavaScript');
    });

    it('should not add duplicate skills', () => {
      cv.addSkill(SkillCategories.LANGUAGES, 'JavaScript');
      cv.addSkill(SkillCategories.LANGUAGES, 'JavaScript');

      const skills = cv.getSkills();
      expect(skills[SkillCategories.LANGUAGES].filter(skill => skill === 'JavaScript').length).toBe(1);
    });
  });

  describe('addSkills', () => {
    it('should add multiple skills to the specified category', () => {
      cv.addSkills(SkillCategories.FRAMEWORKS, ['React', 'Angular', 'Vue']);

      const skills = cv.getSkills();
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('React');
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('Angular');
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('Vue');
    });

    it('should not add duplicate skills when adding multiple', () => {
      cv.addSkill(SkillCategories.FRAMEWORKS, 'React');
      cv.addSkills(SkillCategories.FRAMEWORKS, ['React', 'Angular']);

      const skills = cv.getSkills();
      expect(skills[SkillCategories.FRAMEWORKS].filter(skill => skill === 'React').length).toBe(1);
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('Angular');
    });
  });

  describe('getSkills', () => {
    it('should return all skills organized by category', () => {
      cv.addSkill(SkillCategories.LANGUAGES, 'JavaScript');
      cv.addSkill(SkillCategories.FRAMEWORKS, 'React');
      cv.addSkill(SkillCategories.TOOLS, 'VS Code');

      const skills = cv.getSkills();

      expect(skills[SkillCategories.LANGUAGES]).toContain('JavaScript');
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('React');
      expect(skills[SkillCategories.TOOLS]).toContain('VS Code');
      expect(skills[SkillCategories.METHODOLOGIES]).toEqual([]);
      expect(skills[SkillCategories.CLOUD]).toEqual([]);
      expect(skills[SkillCategories.SOFT_SKILLS]).toEqual([]);
    });
  });

  describe('phonePrettyPrint', () => {
    it('should format phone numbers correctly', () => {
      const basicInfo = cv.getBasicInfo();
      expect(basicInfo.phone).toBe('+34 123 456 789');
    });
  });
});
