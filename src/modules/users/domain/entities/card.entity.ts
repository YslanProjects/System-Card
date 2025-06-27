export enum CardStatus {
  SOLICITADO = 'SOLICITADO',
  APROVADO = 'APROVADO',
  ENTREGUE = 'ENTREGUE',
  ATIVO = 'ATIVO',
  BLOQUEADO_TEMPORARIO = 'BLOQUEADO_TEMPORARIO',
  BLOQUEADO_PERDA_ROUBO = 'BLOQUEADO_PERDA_ROUBO',
  CANCELADO = 'CANCELADO',
}

export enum CardType {
  DEBITO = 'DEBITO',
  CREDITO = 'CREDITO',

}

export enum CardBrand {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  ELO = 'ELO',
  AMERICAN_EXPRESS = 'AMERICAN_EXPRESS',
  HIPERCARD = 'HIPERCARD'
}

export class Card {
  constructor(
    public readonly id: string,
    public readonly number: string,
    public readonly ownerCpf: string,
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

    if (!this.validateCpf(ownerCpf)) {
      throw new Error('CPF inválido');
    }

    // Validar renda mínima conforme tipo, se necessário
  }

  activate(passwordHash: string) {
    if (![CardStatus.APROVADO, CardStatus.ENTREGUE].includes(this.status)) {
      throw new Error('Cartão não pode ser ativado no estado atual.');
    }
    this.status = CardStatus.ATIVO;
    this.passwordHash = passwordHash;
  }

  blockTemporarily() {
    this.status = CardStatus.BLOQUEADO_TEMPORARIO;
  }

  reportLossOrTheft() {
    this.status = CardStatus.BLOQUEADO_PERDA_ROUBO;
  }

  cancel() {
    this.status = CardStatus.CANCELADO;
  }

  private isAdult(): boolean {
    const today = new Date();
    const age = today.getFullYear() - this.birthDate.getFullYear();
    return age > 18 || (age === 18 && today >= new Date(this.birthDate.setFullYear(today.getFullYear())));
  }

  private validateCpf(cpf: string): boolean {
    // Algoritmo de validação de CPF aqui (ou use um helper)
    return true;
  }
}
