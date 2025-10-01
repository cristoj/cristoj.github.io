export class PortfolioError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PortfolioError';
  }

}
