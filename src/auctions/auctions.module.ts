import { Module } from "@nestjs/common";
import { AuctionsController } from "./auctions.controller";
import { AuctionsService } from "./auctions.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/services/prisma.service";

@Module({
    controllers: [AuctionsController],
    providers: [AuctionsService, JwtService, PrismaService]
})
export class AuctionsModule { }