import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserType } from "./user.type";
import { CreateUserDto } from "../auth/dto/create-user.dto";
import { ValidationPipe } from "@nestjs/common";

@Resolver("Users")
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(returns => UserType)
	async getUser(@Args("id", ValidationPipe) id: String) {
		return this.usersService.findById(id);
	}
}
