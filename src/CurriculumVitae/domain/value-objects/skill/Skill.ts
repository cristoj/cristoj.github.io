import SkillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";

export default interface SkillSet {
    [SkillCategories.LANGUAGES]: string[];
    [SkillCategories.FRAMEWORKS]: string[];
    [SkillCategories.TOOLS]: string[];
    [SkillCategories.METHODOLOGIES]: string[];
    [SkillCategories.CLOUD]: string[];
    [SkillCategories.PATRONS_DESIGN]: string[];
    [SkillCategories.CODE_QUALITY]: string[];
    [SkillCategories.OTHERS]: string[];
}
