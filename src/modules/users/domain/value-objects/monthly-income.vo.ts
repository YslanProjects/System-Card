export class MonthlyIncome {
  constructor(private readonly value: number) {
    if (value < 0) throw new Error('Renda não pode ser negativa');
  }

  /**
   * Verifica se a renda é suficiente para o tipo de cartão
   */
  isValidFor(type: 'credit' | 'debit'): boolean {
    if (type === 'credit') return this.value >= 2000;
    if (type === 'debit') return this.value >= 800;
    return false;
  }

  getValue(): number {
    return this.value;
  }
}
