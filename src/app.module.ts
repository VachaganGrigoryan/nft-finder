import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AccountModule } from './account/account.module';
import { LoggerMiddleware } from './logger.middleware';
import configuration from './config/configuration';
import { TasksModule } from './tasks/tasks.module';
import { BullModule } from '@nestjs/bull';
import { MongooseConfigService } from './config/mongoose.config.service';

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoose.url'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   // useExisting: MongooseConfigService,
    //   useClass: MongooseConfigService,
    //   inject: [ConfigService],
    // }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6380,
      },
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    AccountModule,
  ],
  providers: [MongooseConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
