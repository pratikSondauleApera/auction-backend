import { Body, Controller, Post, Req, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuctionsService } from "./auctions.service";
import { CreateAuctionDto } from "src/validations/auctionValidation/createAuction.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "@prisma/client";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";

const storage = diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extenstion = file?.originalname.split('.')[1]
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extenstion)
    }
});

@ApiTags('Auctions')
@Controller('auction')
export class AuctionsController {

    constructor(private auctionsService: AuctionsService) { }

    @Post('create-auction')
    @UseGuards(AuthGuard, RoleGuard)
    @SetMetadata('roles', [Roles.ADMIN, Roles.DE])
    @UseInterceptors(FileInterceptor('attachments', { storage }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: [
                'loanAccountNumber',
                'stateId',
                'cityId',
                'locationId',
                'startDate',
                'endDate',
                'reservePrice',
                'emd',
                'applicationDeadLine',
                'assetTypeId',
                'institutionBank'
            ],
            properties: {
                loanAccountNumber: { type: 'string' },
                stateId: { type: 'string' },
                cityId: { type: 'string' },
                locationId: { type: 'string' },
                startDate: { type: 'string' },
                endDate: { type: 'string' },
                reservePrice: { type: 'string' },
                emd: { type: 'string' },
                applicationDeadLine: { type: 'string' },
                assetTypeId: { type: 'string' },
                institutionBank: { type: 'string' },
                attachments: { type: 'string', format: 'binary' }
            }
        }
    })
    @ApiBearerAuth()
    createAuction(
        @Req() request: Request,
        @Body() data: CreateAuctionDto,
        @UploadedFile() attachments: Express.Multer.File
    ) {
        return this.auctionsService.createAuction(request, data, attachments)
    }
}