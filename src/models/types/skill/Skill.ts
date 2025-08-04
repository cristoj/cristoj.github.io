import SkillCategories from "./SkillCategories";

export default interface SkillSet {
    [SkillCategories.LANGUAGES]: string[];
    [SkillCategories.FRAMEWORKS]: string[];
    [SkillCategories.TOOLS]: string[];
    [SkillCategories.METHODOLOGIES]: string[];
    [SkillCategories.CLOUD]: string[];
    [SkillCategories.SOFT_SKILLS]: string[];
}
