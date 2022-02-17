import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nft-finder'),
    AccountModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
