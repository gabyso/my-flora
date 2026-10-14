export class PlantNotFoundError extends Error {
  public constructor(public readonly plantId: string) {
    super('Plant not found');
    this.name = 'PlantNotFoundError';
  }
}
