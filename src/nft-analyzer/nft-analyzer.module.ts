import { Module } from '@nestjs/common';
import { NftAnalyzerService } from './nft-analyzer.service';
import { NftAnalyzerController } from './nft-analyzer.controller';
import { NetworkModule } from '../network/network.module';
import { NotifyService } from '../notify/notify.service';
import { NotifyModule } from '../notify/notify.module';
import { NetworkService } from '../network/network.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NftAnalyzerService, NetworkService, NotifyService],
  controllers: [NftAnalyzerController],
  exports: [NftAnalyzerService],
})
export class NftAnalyzerModule {}
