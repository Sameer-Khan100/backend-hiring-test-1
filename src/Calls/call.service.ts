import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Call } from './call.entity';

@Injectable()
export class CallService {
  private readonly logger = new Logger(CallService.name);

  constructor(@InjectModel(Call) private readonly callModel: typeof Call) {}

  async logCall(from: string, to: string): Promise<Call> {
    try {
      return await this.callModel.create({ from, to, status: 'incoming' });
    } catch (error) {
      this.logger.error(`Error logging call from ${from} to ${to}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to log call');
    }
  }
}
