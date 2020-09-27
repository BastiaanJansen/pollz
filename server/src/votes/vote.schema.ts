import * as mongoose from "mongoose";

export const VoteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);
