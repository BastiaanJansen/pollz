import * as mongoose from "mongoose";
import { VoteSchema } from "src/votes/vote.schema";

export const OptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		// votes: {
		// 	type: Number,
		// 	required: true,
		// 	default: 0
		// },
		votes: [
			{
				type: VoteSchema,
				required: true
			}
		]
	},
	{
		timestamps: false,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
);

OptionSchema.virtual("totalVotes").get(function() {
	return this.votes.length;
});
