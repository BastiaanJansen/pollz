import * as mongoose from "mongoose";
import { OptionSchema } from "../options/option.schema";

export const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
);
