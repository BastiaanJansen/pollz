import { ObjectType, Field, Int, Float, ID } from "@nestjs/graphql";
import { Document } from "mongoose";
import { UserType } from "src/users/user.type";

@ObjectType("Vote")
export class VoteType extends Document {
	@Field(type => ID)
	_id: String;

	@Field(type => UserType)
	user: UserType;

	@Field()
	createdAt: Date;
}
