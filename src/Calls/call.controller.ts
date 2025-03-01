import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CallService } from './call.service';
import { twiml } from 'twilio';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}

  // Handle incoming calls
  @Post('incoming')
//   For Swagger documentation
  @ApiOperation({ summary: 'Handle incoming Twilio calls' })
  @ApiBody({
    description: 'Twilio Call Request Payload',
    schema: {
      type: 'object',
      properties: {
        From: { type: 'string', example: '+1234567890' },
        To: { type: 'string', example: '+1987654321' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Twilio XML response' })
  async handleIncomingCall(
    @Body('From') From: string,  
    @Body('To') To: string,  
    @Res() res: Response
  ) {

    await this.callService.logCall(From, To);

    const response = new twiml.VoiceResponse();
    const gather = response.gather({ numDigits: 1, action: '/calls/menu' });

    gather.say('Press 1 to be connected, Press 2 to leave a voicemail.');
    response.redirect('/calls/incoming');

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
  }

  // Handle the menu selection
  @Post('menu')
  @ApiOperation({ summary: 'Handle menu selection from caller' })
  @ApiBody({
    description: 'Menu selection from caller',
    schema: {
      type: 'object',
      properties: {
        Digits: { type: 'string', example: '1' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Twilio XML response' })
  async handleMenu(
    @Body('Digits') Digits: string, 
    @Res() res: Response
  ) {

    const response = new twiml.VoiceResponse();

    if (Digits === '1') {
      response.dial(process.env.FORWARD_TO_PHONE);
    } else if (Digits === '2') {
      response.say('Please leave a message after the beep.');
      response.record({ maxLength: 30, action: '/voicemails/record' }); 
    } else {
      response.say('Invalid input.');
      response.redirect('/calls/incoming');
    }

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
  }
}
