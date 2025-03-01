import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Voicemail } from './voicemail.entity';

@Injectable()
export class VoicemailService {
  private readonly logger = new Logger(VoicemailService.name);

  constructor(@InjectModel(Voicemail) private voicemailModel: typeof Voicemail) {}

  async saveVoicemail(from: string, recordingUrl: string): Promise<Voicemail> {
    try {
      const voicemail = await this.voicemailModel.create({ from, recordingUrl });
      return voicemail;
    } catch (error) {
      this.logger.error(`Error saving voicemail from ${from}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to save voicemail');
    }
  }
}
