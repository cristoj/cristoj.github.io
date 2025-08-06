import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import { CurriculumVitaeRepository } from "@/CurriculumVitae/domain/ports/CurriculumVitaeRepository";

export class UpdateCurriculumVitaeUseCase {
    constructor(private readonly repository: CurriculumVitaeRepository) {}

    async update(cv: CurriculumVitae): Promise<void> {
        await this.repository.update(cv);
    }
}
