import { Module } from "@nestjs/common";
import { DataEntryController } from "./dataEntry.controller";
import { DataEntryService } from "./dataEntry.service";
import { PrismaService } from "src/services/prisma.service";

@Module({
    controllers: [DataEntryController],
    providers: [DataEntryService, PrismaService]
})
export class DataEntryModule { }