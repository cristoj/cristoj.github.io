import CurriculumVitae from "./CurriculumVitae";
import Locations from "./types/Locations";
import JobCategories from "./types/JobCategories"; // También necesitarás esto probablemente

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
    ) {
        super(uuid, fullName, email, phone, locations, specialty, linkedin, github, JobCategories.DEVELOPER);
    }
}

export default CVDeveloper;
