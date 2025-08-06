import SkillSet from "@/CurriculumVitae/domain/value-objects/skill/Skill";
import SkillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";
import Locations from "@/_shared/domain/Locations";
import JobCategories from "@/CurriculumVitae/domain/value-objects/JobCategories";
import {BasicInfo} from "@/CurriculumVitae/domain/value-objects/BasicInfo";
import CurriculumVitaeErrors from "@/CurriculumVitae/domain/errors/CurriculumVitaeErrors";

abstract class CurriculumVitae {
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
        linkedin: string,
        github: string,
        jobCategories: JobCategories = JobCategories.OTHER
    ) {
        CurriculumVitae.validateConstructorParams(uuid, fullName, email, phone, specialty, linkedin, github);
        this.uuid = uuid;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.locations = locations;
        this.specialty = specialty;
        this.linkedin = linkedin;
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

    getUuid(): string {
        return this.uuid;
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

    addExperience() {
    }

    private phonePrettyPrint(phone: string): string {
        return phone.replace(/(.{3})/g, '$1 ').trim();
    }

    private static validateConstructorParams(
        uuid: string,
        fullName: string,
        email: string,
        phone: string,
        specialty: string,
        linkedin: string,
        github: string
    ): void {
        // UUID validation
        if (!uuid) {
            throw new CurriculumVitaeErrors('UUID no puede estar vacío');
        }

        // Name validation
        if (!fullName || fullName.trim().length < 2) {
            throw new CurriculumVitaeErrors('El nombre completo debe tener al menos 2 caracteres');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new CurriculumVitaeErrors('Email debe tener un formato válido');
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s\-()]{7,15}$/;
        if (!phone || !phoneRegex.test(phone)) {
            throw new CurriculumVitaeErrors('Teléfono debe tener un formato válido');
        }

        // Specialty validation (importante para developers)
        if (!specialty || specialty.trim().length < 3) {
            throw new CurriculumVitaeErrors('La especialidad debe tener al menos 3 caracteres');
        }

        // LinkedIn validation (importante para developers)
        if (linkedin && !linkedin.includes('linkedin.com')) {
            throw new CurriculumVitaeErrors('LinkedIn debe ser una URL válida');
        }

        // GitHub validation (crítico para developers)
        if (!github || (!github.includes('github.com') && !github.includes('github.io'))) {
            throw new CurriculumVitaeErrors('GitHub es obligatorio para developers y debe ser una URL válida');
        }
    }

}

export default CurriculumVitae;
