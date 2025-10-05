import SkillCategories from '@/CurriculumVitae/domain/value-objects/skill/SkillCategories';

describe('SkillCategories', () => {
    it('should have the correct values', () => {
        expect(SkillCategories.LANGUAGES).toBe('Lenguajes');
        expect(SkillCategories.FRAMEWORKS).toBe('Frameworks');
        expect(SkillCategories.TOOLS).toBe('Herramientas');
        expect(SkillCategories.METHODOLOGIES).toBe('Metodologías');
        expect(SkillCategories.CLOUD).toBe('Cloud/DevOps');
        expect(SkillCategories.PATRONS_DESIGN).toBe('Arquitectura');
        expect(SkillCategories.CODE_QUALITY).toBe('Calidad del código');
        expect(SkillCategories.OTHERS).toBe('Otros');
    });

    it('should have all expected categories', () => {
        const expectedCategories = [
            'Lenguajes',
            'Frameworks',
            'Herramientas',
            'Metodologías',
            'Cloud/DevOps',
            'Arquitectura',
            'Calidad del código',
            'Otros'
        ];

        const allCategories = Object.values(SkillCategories);
        expect(allCategories).toHaveLength(expectedCategories.length);

        expectedCategories.forEach(category => {
            expect(allCategories).toContain(category);
        });
    });
});
