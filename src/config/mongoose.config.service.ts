import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    console.log(this.configService);
    return {
      url: this.configService.get<string>('mongoose.url'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
