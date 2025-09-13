export class ExperienceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExperienceError';
  }
}
