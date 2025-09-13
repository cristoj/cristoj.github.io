import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import Locations from "@/_shared/domain/Locations";
import JobCategories from "@/CurriculumVitae/domain/value-objects/JobCategories";

class CVDeveloper extends CurriculumVitae {
    constructor(
        uuid: string,
        fullName: string,
        email: string,
        phone: string,
        locations: Locations[] = [Locations.REMOTO],
        specialty: string,
        linkedin: string,
        github: string,
        portfolio: string[] | null = null,
        training: string[] | null = null,
        experience: string[] | null = null,
    ) {
        super(uuid, fullName, email, phone, locations, specialty, linkedin, github, JobCategories.DEVELOPER, portfolio, training, experience);
    }
}

export default CVDeveloper;
