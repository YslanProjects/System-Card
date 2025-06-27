export class Cpf {
  private readonly value: string;

  constructor(value: string) {
    const cleaned = value.replace(/[^\d]/g, '');

    if (!Cpf.validate(cleaned)) {
      throw new Error('CPF inválido');
    }

    this.value = cleaned;
  }

  public getValue(): string {
    return this.value;
  }

  static validate(cpf: string): boolean {
    if (typeof cpf !== 'string') return false;

    const cleaned = cpf.replace(/[^\d]/g, '');

    if (!/^\d{11}$/.test(cleaned) || /^(\d)\1{10}$/.test(cleaned)) {
      return false;
    }

    const digits = cleaned.split('').map(Number);

    const calcVerifierDigit = (length: number): number => {
      const sum = digits
        .slice(0, length)
        .reduce((acc, digit, index) => acc + digit * (length + 1 - index), 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calcVerifierDigit(9);
    const digit2 = calcVerifierDigit(10);

    return digit1 === digits[9] && digit2 === digits[10];
  }
}
