import { ObjectType, Field, Int, Float, ID } from "@nestjs/graphql";
import { OptionType } from "../options/option.type";
import { Document } from "mongoose";
import { UserType } from "src/users/user.type";

@ObjectType("Poll")
export class PollType extends Document {
	@Field(type => ID)
	_id: String;

	@Field()
	question: String;

	@Field(type => [OptionType])
	options: OptionType[];

	@Field()
	totalVotes: Number;

	@Field()
	private: Boolean;

	@Field()
	user: UserType;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
