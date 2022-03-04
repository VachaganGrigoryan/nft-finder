import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class NetworkService {
  constructor(private httpService: HttpService) {}

  async request<T = any>(options): Promise<Observable<AxiosResponse<T>>> {
    const config = {
      ...options,
      header: {
        'Content-Type': 'application/json',
      },
      json: true,
      gzip: true,
    };

    return this.httpService.request(config);
  }
}
