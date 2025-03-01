import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Voicemail } from './voicemail.entity';
import { VoicemailService } from './voicemail.service';
import { VoicemailController } from './voicemail.controller';

@Module({
  imports: [SequelizeModule.forFeature([Voicemail])],
  controllers: [VoicemailController],
  providers: [VoicemailService],
  exports: [VoicemailService],
})
export class VoicemailModule {}
