import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { FieldNode } from "graphql";

@InputType()
export class GetPollsSortDto {
	@Field()
	readonly field: String = "createdAt";

	@Field()
	readonly direction: String = "DESC";
}
