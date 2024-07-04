import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuctionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    loanAccountNumber: string;

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
    locationId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    endDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reservePrice: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emd: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    applicationDeadLine: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    assetTypeId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    institutionBank: string;

    @ApiProperty()
    attachments: string;

}