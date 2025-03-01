import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { Call } from './call.entity';

@Module({
  imports: [SequelizeModule.forFeature([Call])],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
