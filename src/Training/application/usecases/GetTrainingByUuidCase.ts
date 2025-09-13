import TrainingRepository from '@/Training/domain/ports/TrainingRepository';
import { Training } from '@/Training/domain/models/Training';
import { TrainingError } from '@/Training/domain/errors/TrainingError';

export class GetTrainingByUuidCase {
  constructor(private readonly repository: TrainingRepository) {}

  async execute(uuid: string): Promise<Training | null> {
    if (!uuid) {
      throw new TrainingError('El uuid es requerido');
    }
    return await this.repository.findById(uuid);
  }
}
