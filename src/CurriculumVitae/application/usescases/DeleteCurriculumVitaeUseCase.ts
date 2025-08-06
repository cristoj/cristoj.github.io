import { CurriculumVitaeRepository } from "@/CurriculumVitae/domain/ports/CurriculumVitaeRepository";

export class DeleteCurriculumVitaeUseCase {
    constructor(private readonly repository: CurriculumVitaeRepository) {}

    async execute(uuid: string): Promise<void> {
        await this.repository.delete(uuid);
    }
}
