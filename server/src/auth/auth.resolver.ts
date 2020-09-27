import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UserType } from "src/users/user.type";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ValidationPipe } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { SignInType } from "./signIn.type";

@Resolver("Auth")
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(returns => UserType)
	async signUp(@Args("input", ValidationPipe) createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto);
	}

	@Mutation(returns => SignInType)
	async signIn(@Args("input", ValidationPipe) signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}
}
