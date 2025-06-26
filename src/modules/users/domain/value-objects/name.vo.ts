export class Name {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Nome não pode ser vazio');
    }
  }

  getValue(): string {
    return this.value;
  }
}
