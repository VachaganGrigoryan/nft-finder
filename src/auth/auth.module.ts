import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
