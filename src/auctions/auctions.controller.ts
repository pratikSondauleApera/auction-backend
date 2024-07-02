import { Body, Controller, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuctionsService } from "./auctions.service";
import { CreateAuctionDto } from "src/validations/auctionValidation/createAuction.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "@prisma/client";

@ApiTags('Auctions')
@Controller('auction')
export class AuctionsController {

    constructor(private auctionsService: AuctionsService) { }

    @Post('create-auction')
    @UseGuards(AuthGuard, RoleGuard)
    @SetMetadata('roles', [Roles.ADMIN, Roles.DE])
    @ApiBearerAuth()
    createAuction(
        @Req() request: Request,
        @Body() data: CreateAuctionDto
    ) {
        return this.auctionsService.createAuction(request, data)
    }
}