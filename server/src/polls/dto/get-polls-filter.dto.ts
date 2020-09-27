import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { Optional } from "@nestjs/common";

@InputType()
export class GetPollsFilterDto {
	@Field({ nullable: true })
	readonly private: Boolean;

	@Field({ nullable: true })
	readonly userId: String;
}
