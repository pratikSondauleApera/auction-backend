import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyEmailDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    otp: string;
}