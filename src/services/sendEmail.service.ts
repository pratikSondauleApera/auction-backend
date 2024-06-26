import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('SENDGRID_API_KEY')
        SendGrid.setApiKey(apiKey);
    }

    async send(mail: SendGrid.MailDataRequired) {
        const transport = await SendGrid.send(mail);
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
    }
}