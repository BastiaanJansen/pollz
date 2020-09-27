import { IsNotEmpty } from "class-validator";
import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { CreateOptionDto } from "../../options/dto/create-option.dto";

@InputType()
export class CreateVoteDto {
	@Field()
	@IsNotEmpty()
	readonly optionId: String;
}
