import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class AuctionsService {

    constructor(
        private prisma: PrismaService
    ) { }

    async createAuction() { }
}