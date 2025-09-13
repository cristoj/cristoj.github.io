import { Training } from '@/Training/domain/models/Training';

export default interface TrainingRepository {
  save(training: Training): Promise<void>;
  findAll(): Promise<Training[]>;
  findById(uuid: string): Promise<Training | null>;
  update(training: Training): Promise<void>;
  delete(uuid: string): Promise<void>;
}
