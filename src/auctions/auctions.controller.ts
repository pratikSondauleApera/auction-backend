import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuctionsService } from "./auctions.service";

@ApiTags('Auctions')
@Controller('auction')
export class AuctionsController {

    constructor(private auctionsService: AuctionsService) { }

}