import { TrainingError } from '@/Training/domain/errors/TrainingError';

export type TrainingUpdatableProps = {
  title?: string;
  description?: string;
  location?: string;
  date_from?: string; // timestamp (ms)
  date_to?: string | null; // timestamp (ms) | null
};

export class Training {
  private readonly uuid: string;
  private readonly title: string;
  private readonly description: string;
  private readonly location: string;
  private readonly date_from: string;
  private readonly date_to: string | null;

  constructor(
    uuid: string,
    title: string,
    description: string,
    location: string,
    date_from: string,
    date_to: string | null = null
  ) {
    Training.validateConstructorParams(uuid, title, description, location, date_from);
    this.uuid = uuid;
    this.title = title;
    this.description = description;
    this.location = location;
    this.date_from = date_from;
    this.date_to = date_to ?? null;
  }

  getUuid() { return this.uuid; }
  getTitle() { return this.title; }
  getDescription() { return this.description; }
  getLocation() { return this.location; }
  getDateFrom() { return this.date_from; }
  getDateTo() { return this.date_to; }

  copyWith(updated: TrainingUpdatableProps): Training {
    const next = {
      uuid: this.uuid,
      title: updated.title ?? this.title,
      description: updated.description ?? this.description,
      location: updated.location ?? this.location,
      date_from: updated.date_from ?? this.date_from,
      date_to: updated.date_to ?? this.date_to,
    };

    Training.validateConstructorParams(
      next.uuid,
      next.title,
      next.description,
      next.location,
      next.date_from
    );

    return new Training(
      next.uuid,
      next.title,
      next.description,
      next.location,
      next.date_from,
      next.date_to
    );
  }

  private static validateConstructorParams(
    uuid: string,
    title: string,
    description: string,
    location: string,
    date_from: string
  ) {
    if (!uuid) {
      throw new TrainingError('Uuid es requerido');
    }
    if (!title) {
      throw new TrainingError('Title es requerido');
    }
    if (!description) {
      throw new TrainingError('Description es requerido');
    }
    if (!location) {
      throw new TrainingError('Location es requerido');
    }
      if (!date_from) {
          throw new TrainingError('Location es requerido');
      }
  }

  getBasicInfo() {
    return {
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      location: this.location,
      date_from: this.date_from,
      date_to: this.date_to,
    };
  }
}
