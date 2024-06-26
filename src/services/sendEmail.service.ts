import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('SENDGRID_API_KEY')

        if (!apiKey) {
            throw new HttpException('Api key not found', HttpStatus.NOT_FOUND)
        }
        SendGrid.setApiKey(apiKey);
    }

    async send(mail: SendGrid.MailDataRequired) {
        try {
            const transport = await SendGrid.send(mail);
            return transport;
        } catch (error) {
            throw new HttpException('Something went wrong while sending email', HttpStatus.FORBIDDEN)
        }
    }
}