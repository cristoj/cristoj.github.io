export class TrainingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrainingError';
  }
}
