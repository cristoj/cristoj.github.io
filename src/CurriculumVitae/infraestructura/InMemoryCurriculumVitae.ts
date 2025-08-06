import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import {CurriculumVitaeRepository} from "@/CurriculumVitae/domain/ports/CurriculumVitaeRepository";

export default class InMemoryCurriculumVitae implements CurriculumVitaeRepository {
    private cvs: Map<string, CurriculumVitae> = new Map();

    async save(cv: CurriculumVitae): Promise<void> {
        this.cvs.set(cv.getUuid(), cv);
    }

    async findById(uuid: string): Promise<CurriculumVitae | null> {
        // Find CV by iterating through the map and comparing uuid
        for (const cv of this.cvs) {
            if (cv[0] === uuid) {
                return cv[1];
            }
        }
        return null;
    }

    async findAll(): Promise<CurriculumVitae[]> {
        return Array.from(this.cvs.values());
    }

    async update(cv: CurriculumVitae): Promise<void> {
        const key = cv.getUuid();
        const exists = Array.from(this.cvs.keys()).some(k => k === key);

        if (!exists) {
            throw new Error(`Curriculum Vitae not found`);
        }

        this.cvs.set(key, cv);
    }

    async delete(uuid: string): Promise<void> {
        const exists = this.cvs.has(uuid);

        if (!exists) {
            throw new Error(`Curriculum Vitae not found`);
        }

        this.cvs.delete(uuid);
    }
}
