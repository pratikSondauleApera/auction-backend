import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CreateAuctionDto } from "src/validations/auctionValidation/createAuction.dto";

@Injectable()
export class AuctionsService {

    constructor(
        private prisma: PrismaService
    ) { }

    async createAuction(request: any, data: CreateAuctionDto) {

        const { id: loggedInUserId } = request.user;

        console.log("UserId ", loggedInUserId)

        const user = await this.prisma.users.findUnique({
            where: {
                id: loggedInUserId
            }
        })

        if (!user) {
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
                attachments: data?.attachments,
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