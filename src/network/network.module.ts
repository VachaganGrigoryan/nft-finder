import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NetworkService } from './network.service';
import { response } from 'express';

@Module({
  imports: [
    HttpModule.register({
      timeout: 90000,
    }),
  ],
  providers: [NetworkService],
  exports: [HttpModule, NetworkService],
})
export class NetworkModule implements OnModuleInit {
  constructor(private readonly httpService) {}

  public onModuleInit(): any {
    const axios = this.httpService.axiosRef;
    const logger = new Logger('NetworkService');

    axios.interceptors.request.use((config) => {
      config['metadata'] = {
        ...config['metadata'],
        startDate: new Date(),
      };
      logger.log(`[REQUEST] ${config.method.toUpperCase()} ${config.url}`);
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = {
          ...config['metadata'],
          startDate: new Date(),
        };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();
        const { data } = response;
        if (!data || !data.code || data?.code === 200) {
          logger.log(
            `[RESPONSE] ${config.method.toUpperCase()} ${
              config.url
            } ${duration}ms`,
          );
        }

        return response;
      },
      (error) => {
        logger.error(JSON.stringify(error));
        return Promise.reject(error);
      },
    );
  }
}
