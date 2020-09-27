import { IsNotEmpty } from "class-validator";
import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { CreateOptionDto } from "../../options/dto/create-option.dto";

@InputType()
export class CreatePollDto {
	@Field()
	@IsNotEmpty()
	readonly question: String;

	@Field()
	@IsNotEmpty()
	readonly private: Boolean = false;

	@Field(type => [CreateOptionDto])
	@IsNotEmpty()
	readonly options: CreateOptionDto[];
}
