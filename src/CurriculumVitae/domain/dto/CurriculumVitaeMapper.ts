import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import SkillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";
import CVDeveloper from "@/CurriculumVitae/domain/models/CVDeveloper";

export default class CurriculumVitaeMapper {
    /**
     * Converts a curriculum vitae object to a JSON string
     * @param curriculumVitae The curriculum vitae object to convert
     * @returns A JSON string representation of the curriculum vitae
     */
    static toJson(curriculumVitae: CurriculumVitae): string {
        const basicInfo = curriculumVitae.getBasicInfo();
        const skills = curriculumVitae.getSkills();

        // Determine the type of curriculum vitae
        const type = curriculumVitae.constructor.name;

        const data = {
            type: type,
            uuid: curriculumVitae.getUuid(),
            basicInfo: {
                fullName: basicInfo.fullName,
                email: basicInfo.email,
                phone: basicInfo.phone,
                locations: basicInfo.locations,
                specialty: basicInfo.specialty,
                linkedin: basicInfo.linkedin,
                github: basicInfo.github,
                jobCategories: basicInfo.jobCategories
            },
            skills: {
                languages: skills[SkillCategories.LANGUAGES],
                frameworks: skills[SkillCategories.FRAMEWORKS],
                tools: skills[SkillCategories.TOOLS],
                methodologies: skills[SkillCategories.METHODOLOGIES],
                cloud: skills[SkillCategories.CLOUD],
                softSkills: skills[SkillCategories.SOFT_SKILLS]
            }
        };

        return JSON.stringify(data);
    }

    /**
     * Converts a JSON string to a CurriculumVitae object
     * @param json The JSON string to convert
     * @returns A curriculum vitae object
     */
    static fromJson(json: string): CurriculumVitae {
        const data = JSON.parse(json);

        let cv: CurriculumVitae;

        // Create the appropriate type of curriculum vitae based on the type field
        // Default to CVDeveloper if the type is not specified
        const type = data.type || 'CVDeveloper';

        switch (type) {
            case 'CVDeveloper':
                cv = new CVDeveloper(
                    data.uuid,
                    data.basicInfo.fullName,
                    data.basicInfo.email,
                    data.basicInfo.phone,
                    data.basicInfo.locations,
                    data.basicInfo.specialty,
                    data.basicInfo.linkedin,
                    data.basicInfo.github
                );
                break;
            // Add cases for other types of curriculum vitae as they are implemented
            default:
                // If the type is not recognized, fall back to CVDeveloper
                cv = new CVDeveloper(
                    data.uuid,
                    data.basicInfo.fullName,
                    data.basicInfo.email,
                    data.basicInfo.phone,
                    data.basicInfo.locations,
                    data.basicInfo.specialty,
                    data.basicInfo.linkedin,
                    data.basicInfo.github
                );
        }

        // Add skills
        if (data.skills.languages) {
            cv.addSkills(SkillCategories.LANGUAGES, data.skills.languages);
        }
        if (data.skills.frameworks) {
            cv.addSkills(SkillCategories.FRAMEWORKS, data.skills.frameworks);
        }
        if (data.skills.tools) {
            cv.addSkills(SkillCategories.TOOLS, data.skills.tools);
        }
        if (data.skills.methodologies) {
            cv.addSkills(SkillCategories.METHODOLOGIES, data.skills.methodologies);
        }
        if (data.skills.cloud) {
            cv.addSkills(SkillCategories.CLOUD, data.skills.cloud);
        }
        if (data.skills.softSkills) {
            cv.addSkills(SkillCategories.SOFT_SKILLS, data.skills.softSkills);
        }

        return cv;
    }
}
