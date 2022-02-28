import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './interfaces/account.interface';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get(':guid')
  async findBy(@Param() params): Promise<Account> {
    return this.accountService.findBy(params.guid);
  }
}
