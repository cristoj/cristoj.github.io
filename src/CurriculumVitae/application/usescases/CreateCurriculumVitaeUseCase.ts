import { CurriculumVitaeRepository } from '@/CurriculumVitae/domain/ports/CurriculumVitaeRepository';
import CurriculumVitae from '@/CurriculumVitae/domain/models/CurriculumVitae';

export default class CreateCurriculumVitaeUseCase {
    constructor(private readonly repository: CurriculumVitaeRepository) {}

    async execute(cv: CurriculumVitae): Promise<void> {
        if (!cv.getBasicInfo().email) {
            throw new Error('El email es requerido');
        }

        await this.repository.save(cv);
    }
}
