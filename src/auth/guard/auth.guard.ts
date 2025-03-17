import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { JWT_SECRET } from "src/lib/constants";
import { PUBLIC_KEY } from "../decorator/auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) return true;

        const token = this.extractTokenFromHeader(request);

        if (token === undefined) {
            throw new UnauthorizedException("Invalid Token");
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: JWT_SECRET
                }
            )

            request['user'] = payload;
        }
        catch(e) {
            throw new UnauthorizedException("Invalid token");
        }

        return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type ==  'Bearer' ? token : undefined;
    }
}