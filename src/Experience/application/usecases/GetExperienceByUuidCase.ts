import ExperienceRepository from '@/Experience/domain/ports/ExperienceRepository';
import { Experience } from '@/Experience/domain/models/Experience';
import { ExperienceError } from '@/Experience/domain/errors/ExperienceError';

export class GetExperienceByUuidCase {
  constructor(private readonly repository: ExperienceRepository) {}

  async execute(uuid: string): Promise<Experience | null> {
    if (!uuid) {
      throw new ExperienceError('El uuid es requerido');
    }
    return await this.repository.findById(uuid);
  }
}
