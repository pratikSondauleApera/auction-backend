import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stateId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cityId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pincode: string;

    @ApiProperty()
    @IsNotEmpty()
    role: Roles
}