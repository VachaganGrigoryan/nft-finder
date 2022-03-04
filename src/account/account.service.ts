import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './schemas/account.schema';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createAccount = new this.accountModel(createAccountDto);

    return createAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(username: string): Promise<Account> {
    return this.accountModel.findOne({ username: username }).exec();
  }

  // async update(username: string, updateAccountDto: UpdateAccountDto) {}
}
