import { IsNotEmpty } from "class-validator";
import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { CreateOptionDto } from "../../options/dto/create-option.dto";

@InputType()
export class CreateUserDto {
	@Field()
	@IsNotEmpty()
	readonly username: String;

	@Field()
	@IsNotEmpty()
	readonly email: String;

	@Field()
	@IsNotEmpty()
	readonly password: String;
}
