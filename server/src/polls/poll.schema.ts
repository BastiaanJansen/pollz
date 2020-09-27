import * as mongoose from "mongoose";
import { OptionSchema } from "../options/option.schema";

export const PollSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true
		},
		options: [
			{
				type: OptionSchema,
				required: false
			}
		],
		private: {
			type: Boolean,
			required: false,
			default: false
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
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

PollSchema.virtual("totalVotes").get(function() {
	let length = 0;
	const votes = this.options.map(option => option.votes);
	votes.forEach(element => {
		length += element.length;
	});

	return length || 0;
});
