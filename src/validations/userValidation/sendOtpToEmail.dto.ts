import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SendOtpToEmail {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string
}