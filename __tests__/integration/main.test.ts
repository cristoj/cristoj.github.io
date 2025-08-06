/**
 * Integration test for the main application functionality
 */
import CVDeveloper from '@/CurriculumVitae/domain/models/CVDeveloper';
import Locations from '@/_shared/domain/Locations';
import SkillCategories from '@/CurriculumVitae/domain/value-objects/skill/SkillCategories';

describe('CV Application Integration', () => {
  let developer: CVDeveloper;

  beforeEach(() => {
    // Create a developer instance similar to the main application
    developer = new CVDeveloper(
      'test-uuid',
      'Test Developer',
      'test@example.com',
      '+34123456789',
      [Locations.ACORUNA, Locations.REMOTO],
      'Full-Stack Developer',
      'https://linkedin.com/test',
      'https://github.com/test',
    );

    // Add skills similar to the main application
    developer.addSkills(SkillCategories.LANGUAGES, ['html', 'css', 'js']);
    developer.addSkills(SkillCategories.FRAMEWORKS, ['React', 'Angular']);
    developer.addSkills(SkillCategories.CLOUD, ['GitHub', 'AWS']);
    developer.addSkills(SkillCategories.METHODOLOGIES, ['Scrum']);
    developer.addSkills(SkillCategories.TOOLS, ['Docker', 'VS Code']);
  });

  describe('Developer CV Integration', () => {
    it('should correctly integrate all CV components', () => {
      // Test basic info
      const basicInfo = developer.getBasicInfo();
      expect(basicInfo.fullName).toBe('Test Developer');
      expect(basicInfo.email).toBe('test@example.com');
      expect(basicInfo.phone).toBe('+34 123 456 789');
      expect(basicInfo.locations).toContain(Locations.ACORUNA);
      expect(basicInfo.locations).toContain(Locations.REMOTO);

      // Test skills
      const skills = developer.getSkills();

      // Languages
      expect(skills[SkillCategories.LANGUAGES]).toContain('html');
      expect(skills[SkillCategories.LANGUAGES]).toContain('css');
      expect(skills[SkillCategories.LANGUAGES]).toContain('js');

      // Frameworks
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('React');
      expect(skills[SkillCategories.FRAMEWORKS]).toContain('Angular');

      // Cloud
      expect(skills[SkillCategories.CLOUD]).toContain('GitHub');
      expect(skills[SkillCategories.CLOUD]).toContain('AWS');

      // Methodologies
      expect(skills[SkillCategories.METHODOLOGIES]).toContain('Scrum');

      // Tools
      expect(skills[SkillCategories.TOOLS]).toContain('Docker');
      expect(skills[SkillCategories.TOOLS]).toContain('VS Code');
    });

    it('should handle adding duplicate skills correctly', () => {
      // Add duplicate skills
      developer.addSkills(SkillCategories.LANGUAGES, ['html', 'css', 'js']);

      // Check that duplicates were not added
      const skills = developer.getSkills();
      expect(skills[SkillCategories.LANGUAGES].filter(skill => skill === 'html').length).toBe(1);
      expect(skills[SkillCategories.LANGUAGES].filter(skill => skill === 'css').length).toBe(1);
      expect(skills[SkillCategories.LANGUAGES].filter(skill => skill === 'js').length).toBe(1);
    });
  });
});
