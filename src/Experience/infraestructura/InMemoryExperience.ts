import ExperienceRepository from '@/Experience/domain/ports/ExperienceRepository';
import { Experience } from '@/Experience/domain/models/Experience';

export default class InMemoryExperience implements ExperienceRepository {
  private static instance: InMemoryExperience;
  private store: Map<string, Experience> = new Map();

  public constructor() {}

  public static getInstance(): InMemoryExperience {
    if (!InMemoryExperience.instance) {
      InMemoryExperience.instance = new InMemoryExperience();
    }
    return InMemoryExperience.instance;
  }

  async save(experience: Experience): Promise<void> {
    this.store.set(experience.getUuid(), experience);
  }

  async findById(uuid: string): Promise<Experience | null> {
    return this.store.get(uuid) || null;
  }

  async findAll(): Promise<Experience[]> {
    return Array.from(this.store.values());
  }

  async update(experience: Experience): Promise<void> {
    const key = experience.getUuid();
    if (!this.store.has(key)) {
      throw new Error('Experience not found');
    }
    this.store.set(key, experience);
  }

  async delete(uuid: string): Promise<void> {
    if (!this.store.has(uuid)) {
      throw new Error('Experience not found');
    }
    this.store.delete(uuid);
  }
}
