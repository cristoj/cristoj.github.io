import ExperienceRepository from '@/Experience/domain/ports/ExperienceRepository';
import { Experience } from '@/Experience/domain/models/Experience';

export class CreateExperienceUseCase {
  constructor(private readonly repository: ExperienceRepository) {}

  async execute(experience: Experience): Promise<void> {
    await this.repository.save(experience);
  }
}
