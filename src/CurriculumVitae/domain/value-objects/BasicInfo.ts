import Locations from "@/_shared/domain/Locations";
import JobCategories from "@/CurriculumVitae/domain/value-objects/JobCategories";

export interface BasicInfo {
    fullName: string;
    email: string;
    phone: string;
    locations: Locations[];
    specialty: string;
    linkedin: string;
    github: string;
    jobCategories: JobCategories;
}
