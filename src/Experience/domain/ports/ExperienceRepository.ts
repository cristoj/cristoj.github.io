import { Experience } from '@/Experience/domain/models/Experience';

export default interface ExperienceRepository {
  save(experience: Experience): Promise<void>;
  findAll(): Promise<Experience[]>;
  findById(uuid: string): Promise<Experience | null>;
  update(experience: Experience): Promise<void>;
  delete(uuid: string): Promise<void>;
}
