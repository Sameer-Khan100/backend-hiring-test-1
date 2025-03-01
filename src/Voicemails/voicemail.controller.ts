import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { VoicemailService } from './voicemail.service';
import { Response } from 'express';
import { twiml } from 'twilio';

@Controller('voicemails')
export class VoicemailController {
  constructor(private readonly voicemailService: VoicemailService) {}

  @Post("record")
  @ApiOperation({ summary: 'Handle voicemail recording' })
  @ApiBody({
    description: 'Voicemail recording details',
    schema: {
      type: 'object',
      properties: {
        From: { type: 'string', example: '+1234567890' },
        RecordingUrl: { type: 'string', example: 'https://api.twilio.com/recording.mp3' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Twilio XML response' })
  async handleVoicemail(
    @Body('From') From: string,
    @Body('RecordingUrl') RecordingUrl: string,
    @Res() res: Response,
  ) {
    await this.voicemailService.saveVoicemail(From, RecordingUrl);

    const response = new twiml.VoiceResponse();
    response.say('Thank you. Your message has been recorded.');

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
  }
}
