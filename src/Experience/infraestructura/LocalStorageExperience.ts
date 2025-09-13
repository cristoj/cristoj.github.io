import { Experience } from '@/Experience/domain/models/Experience';
import ExperienceRepository from '@/Experience/domain/ports/ExperienceRepository';
import ExperienceMapper from '@/Experience/domain/mappers/ExperienceMapper';

export default class LocalStorageExperience implements ExperienceRepository {
  private readonly storageKey: string = 'experience';

  constructor() {
    if (typeof window === 'undefined' || !window.localStorage) {
      throw new Error('No localStorage available');
    }
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }
  }

  async save(experience: Experience): Promise<void> {
    const storage = this.getStorage();
    storage[experience.getUuid()] = ExperienceMapper.toJson(experience);
    this.setStorage(storage);
  }

  async findById(uuid: string): Promise<Experience | null> {
    const storage = this.getStorage();
    const json = storage[uuid];
    if (!json) return null;
    return ExperienceMapper.fromJson(json);
  }

  async findAll(): Promise<Experience[]> {
    const storage = this.getStorage();
    return Object.values(storage).map(item => ExperienceMapper.fromJson(item));
  }

  async update(experience: Experience): Promise<void> {
    const storage = this.getStorage();
    const key = experience.getUuid();
    if (!storage[key]) {
      throw new Error('Experience not found');
    }
    storage[key] = ExperienceMapper.toJson(experience);
    this.setStorage(storage);
  }

  async delete(uuid: string): Promise<void> {
    const storage = this.getStorage();
    if (!storage[uuid]) {
      throw new Error('Experience not found');
    }
    delete storage[uuid];
    this.setStorage(storage);
  }

  private getStorage(): Record<string, string> {
    if (typeof window === 'undefined' || !window.localStorage) {
      return {};
    }
    const storageData = localStorage.getItem(this.storageKey);
    return storageData ? JSON.parse(storageData) : {};
  }

  private setStorage(data: Record<string, string>): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  }
}
