import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service";
import { SendgridService } from "src/services/sendEmail.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, SendgridService]
})
export class UsersModule { }