import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NetworkService } from '../network/network.service';
import { NotifyService } from '../notify/notify.service';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class NftAnalyzerService {
  private subject: any;
  constructor(
    private readonly networkService: NetworkService,
    private readonly notifyService: NotifyService,
    private readonly configService: ConfigService,
  ) {}

  @Cron('*/30 * * * * *')
  async getNewNft() {
    const res = await this.getNftConfigTxn();
    return res;
  }

  async getNftConfigTxn() {
    const query = `${this.configService.get<string>(
      'algo.indexer',
    )}/v2/transactions?tx-type=acfg&min-round=19678191`;
    return await this.networkService.get(query);
  }
}
