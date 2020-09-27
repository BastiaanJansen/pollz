import { ObjectType, Field, Int, Float, ID } from "@nestjs/graphql";
import { Document } from "mongoose";
import { VoteType } from "src/votes/vote.type";

@ObjectType("Option")
export class OptionType extends Document {
	@Field(type => ID)
	_id: String;

	@Field()
	name: String;

	@Field()
	winner: Boolean;

	@Field(type => [VoteType])
	votes: VoteType[];

	@Field()
	totalVotes: Number;
}
