import SkillCategories from '../../../models/skill/SkillCategories';

describe('SkillCategories', () => {
  it('should have the correct values', () => {
    expect(SkillCategories.LANGUAGES).toBe('Lenguajes');
    expect(SkillCategories.FRAMEWORKS).toBe('Frameworks');
    expect(SkillCategories.TOOLS).toBe('Herramientas');
    expect(SkillCategories.METHODOLOGIES).toBe('Metodologías');
    expect(SkillCategories.CLOUD).toBe('Cloud/DevOps');
    expect(SkillCategories.SOFT_SKILLS).toBe('Habilidades Blandas');
  });

  it('should have all expected categories', () => {
    const expectedCategories = [
      'Lenguajes',
      'Frameworks',
      'Herramientas',
      'Metodologías',
      'Cloud/DevOps',
      'Habilidades Blandas'
    ];

    const allCategories = Object.values(SkillCategories);
    expect(allCategories).toHaveLength(expectedCategories.length);

    expectedCategories.forEach(category => {
      expect(allCategories).toContain(category);
    });
  });
});
