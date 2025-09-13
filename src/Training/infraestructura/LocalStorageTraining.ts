import { Training } from '@/Training/domain/models/Training';
import TrainingRepository from '@/Training/domain/ports/TrainingRepository';
import TrainingMapper from '@/Training/domain/mappers/TrainingMapper';

export default class LocalStorageTraining implements TrainingRepository {
  private readonly storageKey: string = 'training';

  constructor() {
    if (typeof window === 'undefined' || !window.localStorage) {
      throw new Error('No localStorage available');
    }
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }
  }

  async save(training: Training): Promise<void> {
    const storage = this.getStorage();
    storage[training.getUuid()] = TrainingMapper.toJson(training);
    this.setStorage(storage);
  }

  async findById(uuid: string): Promise<Training | null> {
    const storage = this.getStorage();
    const json = storage[uuid];
    if (!json) {
      return null;
    }
    return TrainingMapper.fromJson(json);
  }

  async findAll(): Promise<Training[]> {
    const storage = this.getStorage();
    return Object.values(storage).map(item => TrainingMapper.fromJson(item));
  }

  async update(training: Training): Promise<void> {
    const storage = this.getStorage();
    const key = training.getUuid();
    if (!storage[key]) {
      throw new Error('Training not found');
    }
    storage[key] = TrainingMapper.toJson(training);
    this.setStorage(storage);
  }

  async delete(uuid: string): Promise<void> {
    const storage = this.getStorage();
    if (!storage[uuid]) {
      throw new Error('Training not found');
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
