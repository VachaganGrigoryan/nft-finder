import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { response } from 'express';

@Injectable()
export class NetworkService {
  constructor(private httpService: HttpService) {}

  async request<T>(options): Promise<Observable<AxiosResponse<T>>> {
    const config = {
      ...options,
      header: {
        'Content-Type': 'application/json',
      },
      json: true,
      gzip: true,
    };

    return this.httpService
      .request(config)
      .pipe(map((response) => response.data));
  }

  async get<T>(url: string, config?): Promise<Observable<AxiosResponse<T>>> {
    const options = {
      url,
      method: 'GET',
      ...config,
    };
    return await this.request<T>(options);
  }

  async post<T>(
    url: string,
    data?,
    config?,
  ): Promise<Observable<AxiosResponse<T>>> {
    const options = {
      url,
      method: 'POST',
      data,
      ...config,
    };

    return await this.request<T>(options);
  }
}
