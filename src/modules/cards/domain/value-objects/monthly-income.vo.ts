export class MonthlyIncome {
  private readonly value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Renda mensal não pode ser negativa');
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }
}
