import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { Cpf } from '../../domain/value-objects/cpf.vo';
import { BirthDate } from '../../domain/value-objects/birth-date.vo';
import { MonthlyIncome } from '../../domain/value-objects/monthly-income.vo';
import { Name } from '../../domain/value-objects/name.vo';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserInput } from './dtos/register-user.input';
import { UserOutput } from './dtos/user.output';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<UserOutput> {
    const user = new User(
      new Cpf(input.cpf),
      new Name(input.name),
      new BirthDate(new Date(input.birthDate)),
      new MonthlyIncome(input.income)
    );

    await this.userRepository.save(user);

    return {
      cpf: user.cpf.getValue(),
      name: user.name.getValue(),
      birthDate: user.birthDate.getValue(),
    };
  }
}
