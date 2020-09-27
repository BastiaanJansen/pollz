import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PollType } from "src/polls/poll.type";
import { PollsService } from "src/polls/polls.service";

@Injectable()
export class OptionsService {
	constructor(
		@InjectModel("Poll") private readonly pollModel: Model<PollType>,
		private readonly pollsService: PollsService
	) {}

	// async vote() {
	// 	// const poll = await this.pollModel
	// 	// 	.findOneAndUpdate(
	// 	// 		{
	// 	// 			"options._id": id
	// 	// 		},
	// 	// 		{
	// 	// 			$inc: {
	// 	// 				"options.$.votes": 1
	// 	// 			}
	// 	// 		},

	// 	// 		{
	// 	// 			new: true
	// 	// 		}
	// 	// 	)
	// 	// 	.populate("user");

	// 	const poll = await this.pollModel
	// 		.findOneAndUpdate(
	// 			{
	// 				"options._id": id
	// 			},
	// 			{
	// 				$push: {
	// 					"options.$.user": {

	// 					}
	// 				}
	// 			},
	// 			{
	// 				new: true
	// 			}
	// 		)
	// 		.populate("user");

	// 	return poll;
	// }

	async unvote(id: String) {
		const poll = await this.pollModel
			.findOneAndUpdate(
				{
					"options._id": id
				},
				{
					$inc: {
						"options.$.votes": -1
					}
				},

				{
					new: true
				}
			)
			.populate("user");

		return poll;
	}
}
