import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "@prisma/client";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsEmail()
    password: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    cityId: string;

    @ApiProperty()
    @IsString()
    stateId: string;

    @ApiProperty()
    @IsString()
    pincode: string;

    @ApiProperty()
    @IsBoolean()
    active: boolean

    @ApiProperty()
    role: Roles
}