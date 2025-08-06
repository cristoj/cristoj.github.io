import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import { CurriculumVitaeRepository } from "@/CurriculumVitae/domain/ports/CurriculumVitaeRepository";

export class GetCurriculumVitaeUseCase {
    constructor(private readonly repository: CurriculumVitaeRepository) {}

    async getById(uuid: string): Promise<CurriculumVitae | null> {
        return await this.repository.findById(uuid);
    }

    async getAll(): Promise<CurriculumVitae[]> {
        return await this.repository.findAll();
    }
}
