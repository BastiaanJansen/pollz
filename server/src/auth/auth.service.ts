import {
	Injectable,
	BadRequestException,
	UnauthorizedException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "src/users/user.type";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtPayload } from "./jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@InjectModel("User") private readonly userModel: Model<UserType>,
		private readonly jwtService: JwtService
	) {}

	async signUp(createUserDto: CreateUserDto) {
		let { username, email, password } = createUserDto;
		email = email.toLowerCase();

		const salt = await bcrypt.genSalt();

		const user = new this.userModel({
			username,
			email,
			password: await this.hashPassword(password, salt),
			salt
		});
		return await user.save();
	}

	async signIn(signInDto: SignInDto) {
		let { email, password } = signInDto;
		email = email.toLowerCase();
		const user = await this.userModel.findOne({ email });

		if (!user) return;

		if (
			!(await this.validatePassword(password, user.password, user.salt))
		) {
			return new UnauthorizedException();
		}

		const payload: JwtPayload = {
			id: user._id,
			username: user.username,
			email: user.email
		};
		const token = await this.jwtService.sign(payload);

		return { token };
	}

	private async hashPassword(password: String, salt: String) {
		return await bcrypt.hash(password, salt);
	}

	private async validatePassword(
		password: String,
		hashedPassword: String,
		salt: String
	) {
		const hash = await bcrypt.hash(password, salt);
		return hash === hashedPassword;
	}
}
