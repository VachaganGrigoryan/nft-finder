import { Injectable } from '@nestjs/common';
import { Account } from './interfaces/account.interface';

@Injectable()
export class AccountService {
  private readonly account: Account[] = [];

  create(account: Account) {
    this.account.push(account);
  }

  findAll(): Account[] {
    return this.account;
  }

  findBy(guid: string): Account {
    return this.account.filter((account) => account.guid == guid).pop();
  }
}
