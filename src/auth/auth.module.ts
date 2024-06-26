import { Module } from "@nestjs/common";
import { AuthContoller } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [AuthContoller],
    providers: [AuthService, PrismaService, JwtService]
})
export class AuthModule { }