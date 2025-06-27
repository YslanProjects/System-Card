import { CardStatus } from '../enums/card-status.enum';
import { CardType } from '../enums/card-type.enum';
import { CardBrand } from '../enums/card-brand.enum';
import { Cpf } from '../value-objects/cpf.vo';

export class Card {
  constructor(
    public readonly id: string,
    public readonly number: string,
    public readonly ownerCpf: Cpf, 
    public readonly fullName: string,
    public readonly birthDate: Date,
    public readonly income: number,
    public readonly type: CardType,
    public readonly brand: CardBrand,
    public status: CardStatus = CardStatus.SOLICITADO,
    public passwordHash?: string,
  ) {
    if (!this.isAdult()) {
      throw new Error('O titular deve ter mais de 18 anos');
    }
  }

  activate(passwordHash: string): void {
    if (![CardStatus.APROVADO, CardStatus.ENTREGUE].includes(this.status)) {
      throw new Error('Cartão não pode ser ativado no estado atual.');
    }
    this.status = CardStatus.ATIVO;
    this.passwordHash = passwordHash;
  }

  blockTemporarily(): void {
    this.status = CardStatus.BLOQUEADO_TEMPORARIO;
  }

  reportLossOrTheft(): void {
    this.status = CardStatus.BLOQUEADO_PERDA_ROUBO;
  }

  cancel(): void {
    this.status = CardStatus.CANCELADO;
  }

  private isAdult(): boolean {
    const today = new Date();
    const age = today.getFullYear() - this.birthDate.getFullYear();
    const hasHadBirthday =
      today.getMonth() > this.birthDate.getMonth() ||
      (today.getMonth() === this.birthDate.getMonth() && today.getDate() >= this.birthDate.getDate());

    return age > 18 || (age === 18 && hasHadBirthday);
  }
}
