import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CreateAuctionDto } from "src/validations/auctionValidation/createAuction.dto";
import * as fs from 'fs-extra';

@Injectable()
export class AuctionsService {

    constructor(
        private prisma: PrismaService
    ) { }

    async createAuction(request: any, data: CreateAuctionDto, file: Express.Multer.File) {

        const { id: loggedInUserId } = request.user;

        console.log("UserId ", loggedInUserId)

        const filePath = `./uploads/${file?.filename}`;

        const user = await this.prisma.users.findUnique({
            where: {
                id: loggedInUserId
            }
        })

        if (!user) {
            await fs.unlink(filePath)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const getState = await this.prisma.states.findUnique({
            where: {
                id: data?.stateId
            }
        })

        if (!getState) {
            throw new HttpException('State not found', HttpStatus.NOT_FOUND)
        }

        const getCity = await this.prisma.cities.findUnique({
            where: {
                id: data?.cityId
            }
        })

        if (!getCity) {
            throw new HttpException('City not found', HttpStatus.NOT_FOUND)
        }

        const getLocation = await this.prisma.locations.findUnique({
            where: {
                id: data?.locationId
            }
        })

        if (!getLocation) {
            throw new HttpException('Location not found', HttpStatus.NOT_FOUND)
        }

        const getAssetType = await this.prisma.assetTypes.findUnique({
            where: {
                id: data?.assetTypeId
            }
        })

        if (!getAssetType) {
            throw new HttpException('Asset type not found', HttpStatus.NOT_FOUND)
        }

        const existingAuction = await this.prisma.auctions.findUnique({
            where: {
                loanAccountNumber: data?.loanAccountNumber
            }
        })

        if (existingAuction) {
            throw new HttpException('This property is already added', HttpStatus.CONFLICT)
        }

        const startDateTime = new Date(data?.startDate)
        const endDateTime = new Date(data?.endDate)

        if (startDateTime.getTime() > endDateTime.getTime()) {
            throw new HttpException('Start date should not be greater than end date', HttpStatus.BAD_REQUEST);
        }

        try {
            const auctionData = {
                loanAccountNumber: data?.loanAccountNumber,
                cityId: getCity.id,
                stateId: getState.id,
                locationId: getLocation.id,
                startDate: data?.startDate,
                endDate: data?.endDate,
                reservePrice: data?.reservePrice,
                emd: data?.emd,
                applicationDeadLine: data?.applicationDeadLine,
                assetTypeId: getAssetType.id,
                institutionBank: data?.institutionBank,
                attachments: file?.filename,
                userId: user?.id
            }

            const createAuction = await this.prisma.auctions.create({
                data: auctionData
            })

            return {
                status: true,
                statusCode: HttpStatus.CREATED,
                auction: createAuction,
                msg: "Auction created successfully"
            }
        } catch (error) {
            console.log(error)
            throw new HttpException('Something went wrong while creating auction', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}