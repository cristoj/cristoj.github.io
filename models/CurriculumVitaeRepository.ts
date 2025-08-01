import SkillSet from "./skill/Skill";
import SkillCategories from "./skill/SkillCategories";
import Locations from "./types/Locations";
import JobCategories from "./types/JobCategories";
import {BasicInfo} from "./types/BasicInfo";

export default abstract class CurriculumVitaeRepository {
    protected uuid: string;
    protected fullName: string;
    protected email: string;
    protected phone: string;
    protected locations: Locations[];
    protected specialty: string;
    protected linkedin: string;
    protected github: string;
    protected jobCategories: JobCategories;
    protected skillSet: SkillSet;

    protected constructor(
        uuid: string,
        fullName: string,
        email: string,
        phone: string,
        locations: Locations[] = [Locations.REMOTO],
        specialty: string,
        linkedIn: string,
        github: string,
        jobCategories: JobCategories = JobCategories.OTHER
    ) {
        this.uuid = uuid;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.locations = locations;
        this.specialty = specialty;
        this.linkedin = linkedIn;
        this.github = github;
        this.jobCategories = jobCategories;
        this.skillSet = {
            [SkillCategories.LANGUAGES]: [],
            [SkillCategories.FRAMEWORKS]: [],
            [SkillCategories.TOOLS]: [],
            [SkillCategories.METHODOLOGIES]: [],
            [SkillCategories.CLOUD]: [],
            [SkillCategories.SOFT_SKILLS]: [],
        };
    }

    abstract getBasicInfo(): BasicInfo;

    abstract addSkill(category: SkillCategories, skillName: string): void;

    abstract addSkills(category: SkillCategories, skillNames: string[]): void;

    abstract getSkills(): SkillSet;

    abstract addExperience(): void;
}
