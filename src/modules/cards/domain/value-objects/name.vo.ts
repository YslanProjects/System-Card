export class Name {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.length < 3) {
      throw new Error('Nome inválido');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}
