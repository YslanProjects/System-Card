export class BirthDate {
  private readonly value: Date;

  constructor(value: Date) {
    if (!BirthDate.isAdult(value)) {
      throw new Error('O titular deve ter mais de 18 anos');
    }
    this.value = value;
  }

  public getValue(): Date {
    return this.value;
  }

  static isAdult(date: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age > 18 || (age === 18 && today >= new Date(date.setFullYear(today.getFullYear())));
  }
}
