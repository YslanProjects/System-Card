export class Cpf {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('CPF inválido');
    }
  }

  private isValid(cpf: string): boolean {
    // Remover não dígitos
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let firstCheckDigit = (sum * 10) % 11;
    if (firstCheckDigit === 10) firstCheckDigit = 0;
    if (firstCheckDigit !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    let secondCheckDigit = (sum * 10) % 11;
    if (secondCheckDigit === 10) secondCheckDigit = 0;
    if (secondCheckDigit !== parseInt(cpf[10])) return false;

    return true;
  }

  getValue(): string {
    return this.value;
  }
}
