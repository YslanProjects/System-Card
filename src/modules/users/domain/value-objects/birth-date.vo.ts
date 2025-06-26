export class BirthDate {
  constructor(private readonly value: Date) {
    if (!this.isAdult()) {
      throw new Error('Usuário deve ter pelo menos 18 anos');
    }
  }

  private calculateAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.value.getFullYear();
    const monthDiff = today.getMonth() - this.value.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.value.getDate())
    ) {
      age--;
    }

    return age;
  }

  isAdult(): boolean {
    return this.calculateAge() >= 18;
  }

  getValue(): Date {
    return this.value;
  }
}
