import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";

export interface CurriculumVitaeRepository {
    save(cv: CurriculumVitae): Promise<void>;
    findById(uuid: string): Promise<CurriculumVitae | null>;
    findAll(): Promise<CurriculumVitae[]>;
    update(cv: CurriculumVitae): Promise<void>;
    delete(uuid: string): Promise<void>;
}
