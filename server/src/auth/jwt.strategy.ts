import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "config";
import { JwtPayload } from "./jwt-payload.interface";
import { UsersService } from "src/users/users.service";

const jwtConfig = config.get("jwt");

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret
		});
	}

	async validate(payload: JwtPayload) {
		const { id } = payload;
		const user = await this.usersService.findById(id);
		if (!user) {
			throw new UnauthorizedException();
		}

		delete user.password;
		delete user.salt;

		return user;
	}
}
