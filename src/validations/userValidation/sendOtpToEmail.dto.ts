import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SendOtpToEmail {
    @ApiProperty()
    @IsString()
    email: string
}