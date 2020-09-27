import { IsNotEmpty } from "class-validator";
import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateOptionDto {
	@Field()
	@IsNotEmpty()
	readonly name: String;
}
