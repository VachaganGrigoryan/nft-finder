import { Controller, Get } from '@nestjs/common';
import { NftAnalyzerService } from './nft-analyzer.service';

@Controller('nft-analyzer')
export class NftAnalyzerController {
  constructor(private readonly nas: NftAnalyzerService) {}

  @Get('nft')
  async getCryptocurrencies() {
    const res = await this.nas.getNewNft();
    return res;
  }
}
