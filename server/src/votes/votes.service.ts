import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PollType } from "src/polls/poll.type";
import { PollsService } from "src/polls/polls.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { VoteType } from "./vote.type";
import { UserType } from "src/users/user.type";
import * as mongoose from "mongoose";

@Injectable()
export class VotesService {
	constructor(
		@InjectModel("Poll") private readonly pollModel: Model<PollType>,
		@InjectModel("Vote") private readonly voteModel: Model<VoteType> // private readonly pollsService: PollsService
	) {}

	async vote(user: UserType, createVoteDto: CreateVoteDto) {
		const { optionId } = createVoteDto;

		const poll = await this.pollModel
			.findOneAndUpdate(
				{
					"options._id": optionId
				},
				{
					$push: {
						"options.$.votes": {
							user: user.id,
							createdAt: new Date()
						}
					}
				},
				{
					new: true
				}
			)
			.populate(["user", "options.votes.user"]);

		return poll;
	}

	async unvote(id: String) {
		const poll = await this.pollModel
			.findOne({
				"options.votes._id": id
			})
			.populate(["user", "options.votes.user"]);

		if (!poll) return new NotFoundException();

		poll.options.forEach(option => {
			const vote = option.votes.find(vote => {
				return vote._id.toString() === id.toString();
			});

			if (vote) vote.remove();
		});

		return await poll.save();
	}

	// async hasVoted(user: UserType, pollId: String) {
	// 	const poll = await this.pollModel.find({
	// 		_id: pollId,
	// 		"options.votes.user._id": user._id
	// 	});

	// 	console.log(poll);
	// }
}
