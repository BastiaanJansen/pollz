import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SignInType {
	@Field()
	token: String;
}
