import Locations from "./Locations";
import JobCategories from "./JobCategories";

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
