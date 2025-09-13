import TrainingRepository from '@/Training/domain/ports/TrainingRepository';
import { Training } from '@/Training/domain/models/Training';

export class CreateTrainingUseCase {
  constructor(private readonly repository: TrainingRepository) {}

  async execute(training: Training): Promise<void> {
    await this.repository.save(training);
  }
}
