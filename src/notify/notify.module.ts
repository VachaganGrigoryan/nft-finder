import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NftAnalyzerModule } from '../nft-analyzer/nft-analyzer.module';
import { NetworkModule } from '../network/network.module';

@Module({
  imports: [NetworkModule],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
