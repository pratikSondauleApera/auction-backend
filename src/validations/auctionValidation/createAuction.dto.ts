import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuctionDto {
    @ApiProperty()
    @IsString()
    loanAccountNumber: string;

    @ApiProperty()
    @IsString()
    stateId: string;

    @ApiProperty()
    @IsString()
    cityId: string;

    @ApiProperty()
    @IsString()
    locationId: string;

    @ApiProperty()
    @IsString()
    startDate: string;

    @ApiProperty()
    @IsString()
    endDate: string;

    @ApiProperty()
    @IsString()
    reservePrice: string;

    @ApiProperty()
    @IsString()
    emd: string;

    @ApiProperty()
    @IsString()
    applicationDeadLine: string;

    @ApiProperty()
    @IsString()
    assetTypeId: string;

    @ApiProperty()
    @IsString()
    institutionBank: string;

    @ApiProperty()
    @IsString()
    attachments: string;

}