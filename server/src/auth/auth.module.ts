import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/user.schema";
import { JwtModule } from "@nestjs/jwt";
import config from "config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "src/users/users.module";

const jwtConfig = config.get("jwt");

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: "jwt"
		}),
		JwtModule.register({
			secret: jwtConfig.secret,
			signOptions: {
				expiresIn: jwtConfig.expiresIn
			}
		}),
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
		UsersModule
	],
	providers: [AuthService, AuthResolver, JwtStrategy],
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
