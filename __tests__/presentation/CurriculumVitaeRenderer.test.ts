import CVDeveloper from '@/CurriculumVitae/domain/models/CVDeveloper';
import Locations from '@/_shared/domain/Locations';
import SkillCategories from '@/CurriculumVitae/domain/value-objects/skill/SkillCategories';
import CurriculumVitaeRenderer from '@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer';

describe('CurriculumVitaeRenderer', () => {
  let developer: CVDeveloper;
  let mockElement: HTMLElement;

  beforeEach(() => {
    // Create a developer for testing
    developer = new CVDeveloper(
      'test-uuid',
      'Test Developer',
      'test@example.com',
      '+34123456789',
      [Locations.ACORUNA, Locations.REMOTO],
      'Test specialty',
      'https://linkedin.com/test',
      'https://github.com/test',
    );

    // Add some skills
    developer.addSkills(SkillCategories.LANGUAGES, ['html', 'css', 'js']);
    developer.addSkills(SkillCategories.FRAMEWORKS, ['React', 'Angular']);

    // Mock HTML element
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    // Clean up
    if (mockElement.parentNode) {
      mockElement.parentNode.removeChild(mockElement);
    }
  });

  describe('render', () => {
    it('should render the CV to the target element', () => {
      // Create renderer
      const renderer = new CurriculumVitaeRenderer(developer, mockElement);

      // Render
      renderer.render();

      // Check that the HTML contains the developer information
      expect(mockElement.innerHTML).toContain('Test Developer');
      expect(mockElement.innerHTML).toContain('test@example.com');
      expect(mockElement.innerHTML).toContain('+34 123 456 789');
      expect(mockElement.innerHTML).toContain('Test specialty');
      expect(mockElement.innerHTML).toContain('https://linkedin.com/test');
      expect(mockElement.innerHTML).toContain('https://github.com/test');

      // Check that locations are rendered
      expect(mockElement.innerHTML).toContain(Locations.ACORUNA);
      expect(mockElement.innerHTML).toContain(Locations.REMOTO);

      // Check that skills are rendered
      expect(mockElement.innerHTML).toContain('html');
      expect(mockElement.innerHTML).toContain('css');
      expect(mockElement.innerHTML).toContain('js');
      expect(mockElement.innerHTML).toContain('React');
      expect(mockElement.innerHTML).toContain('Angular');
    });

    it('should render to document.body by default', () => {
      // Save original body innerHTML
      const originalHTML = document.body.innerHTML;

      try {
        // Create renderer without specifying target element
        const renderer = new CurriculumVitaeRenderer(developer);

        // Render
        renderer.render();

        // Check that the HTML contains the developer information
        expect(document.body.innerHTML).toContain('Test Developer');
        expect(document.body.innerHTML).toContain('test@example.com');
      } finally {
        // Restore original body HTML
        document.body.innerHTML = originalHTML;
      }
    });
  });

  describe('renderError', () => {
    it('should render an Error object correctly', () => {
      // Create renderer
      const renderer = new CurriculumVitaeRenderer(developer, mockElement);

      // Create an error
      const error = new Error('Test error message');

      // Render error
      renderer.renderError(error);

      // Check that the HTML contains the error information
      expect(mockElement.innerHTML).toContain('Error');
      expect(mockElement.innerHTML).toContain('Test error message');
    });

    it('should render a non-Error object correctly', () => {
      // Create renderer
      const renderer = new CurriculumVitaeRenderer(developer, mockElement);

      // Render a string error
      renderer.renderError('Something went wrong');

      // Check that the HTML contains the error information
      expect(mockElement.innerHTML).toContain('Unknown error occurred');
      expect(mockElement.innerHTML).toContain('Something went wrong');
    });
  });
});
