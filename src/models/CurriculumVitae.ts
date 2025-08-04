import CurriculumVitaeRepository from "./CurriculumVitaeRepository";

import SkillSet from "./types/skill/Skill";
import SkillCategories from "./types/skill/SkillCategories";
import Locations from "./types/Locations";
import JobCategories from "./types/JobCategories";
import {BasicInfo} from "./types/BasicInfo";

class CurriculumVitae extends CurriculumVitaeRepository {

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

    addSkill(category: SkillCategories, skillName: string): void {
        if (this.skillSet[category].length && this.skillSet[category].includes(skillName)) {
            return
        }
        this.skillSet[category].push(skillName);
    }

    addSkills(category: SkillCategories, skillNames: string[]): void {
        skillNames.forEach(skillName => {
            this.addSkill(category, skillName); // ✅ Reutiliza la lógica que ya funciona
        });
    }

    getSkills(): SkillSet {
        return {
            [SkillCategories.LANGUAGES]: this.skillSet[SkillCategories.LANGUAGES],
            [SkillCategories.FRAMEWORKS]: this.skillSet[SkillCategories.FRAMEWORKS],
            [SkillCategories.TOOLS]: this.skillSet[SkillCategories.TOOLS],
            [SkillCategories.METHODOLOGIES]: this.skillSet[SkillCategories.METHODOLOGIES],
            [SkillCategories.CLOUD]: this.skillSet[SkillCategories.CLOUD],
            [SkillCategories.SOFT_SKILLS]: this.skillSet[SkillCategories.SOFT_SKILLS],
        }
    }

    getBasicInfo(): BasicInfo {
        return {
            fullName: this.fullName,
            email: this.email,
            phone: this.phonePrettyPrint(this.phone),
            locations: this.locations,
            specialty: this.specialty,
            linkedin: this.linkedin,
            github: this.github,
            jobCategories: this.jobCategories,
        };
    }

    override addExperience() {
    }

    private phonePrettyPrint(phone: string): string {
        return phone.replace(/(.{3})/g, '$1 ').trim();
    }
}

export default CurriculumVitae;
