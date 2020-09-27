import { ObjectType, Field, Int, Float, ID } from "@nestjs/graphql";
import { OptionType } from "../options/option.type";
import { Document } from "mongoose";
import * as bcrypt from "bcrypt";

@ObjectType("User")
export class UserType extends Document {
	@Field(type => ID)
	_id: String;

	@Field()
	username: String;

	@Field()
	email: String;

	user: String;

	password: String;

	salt: String;
}
