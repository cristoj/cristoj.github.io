import { Training } from '@/Training/domain/models/Training';

export type TrainingDTO = {
  uuid: string;
  title: string;
  description: string;
  location: string;
  date_from: string;
  date_to: string | null;
};

export default class TrainingMapper {
  static toJson(training: Training): string {
    const dto: TrainingDTO = {
      uuid: training.getUuid(),
      title: training.getTitle(),
      description: training.getDescription(),
      location: training.getLocation(),
      date_from: training.getDateFrom(),
      date_to: training.getDateTo(),
    };
    return JSON.stringify(dto);
  }

  static fromJson(json: string): Training {
    const data: TrainingDTO = JSON.parse(json);
    return new Training(
      data.uuid,
      data.title,
      data.description,
      data.location,
      data.date_from,
      data.date_to,
    );
  }
}
