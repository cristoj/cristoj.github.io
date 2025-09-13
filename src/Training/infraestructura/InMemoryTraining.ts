import TrainingRepository from '@/Training/domain/ports/TrainingRepository';
import { Training } from '@/Training/domain/models/Training';

export default class InMemoryTraining implements TrainingRepository {
  private static instance: InMemoryTraining;
  private store: Map<string, Training> = new Map();

  public constructor() {}

  public static getInstance(): InMemoryTraining {
    if (!InMemoryTraining.instance) {
      InMemoryTraining.instance = new InMemoryTraining();
    }
    return InMemoryTraining.instance;
  }

  async save(training: Training): Promise<void> {
    this.store.set(training.getUuid(), training);
  }

  async findById(uuid: string): Promise<Training | null> {
    return this.store.get(uuid) || null;
  }

  async findAll(): Promise<Training[]> {
    return Array.from(this.store.values());
  }

  async update(training: Training): Promise<void> {
    const key = training.getUuid();
    if (!this.store.has(key)) {
      throw new Error('Training not found');
    }
    this.store.set(key, training);
  }

  async delete(uuid: string): Promise<void> {
    if (!this.store.has(uuid)) {
      throw new Error('Training not found');
    }
    this.store.delete(uuid);
  }
}
