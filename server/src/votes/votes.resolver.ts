import { Resolver, Mutation, Args, Subscription } from "@nestjs/graphql";
import { VotesService } from "./votes.service";
import { PollType } from "src/polls/poll.type";
import { ValidationPipe, UseGuards } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { PubSub } from "graphql-subscriptions";
import { GraphqlAuthGuard } from "src/auth/graphql-auth.guard";
import { GetUser } from "src/auth/get-user.decorator";
import { UserType } from "src/users/user.type";

const pubSub = new PubSub();

@Resolver("Votes")
export class VotesResolver {
	constructor(private readonly votesService: VotesService) {}

	@Mutation(returns => PollType)
	@UseGuards(GraphqlAuthGuard)
	async vote(
		@Args("input", ValidationPipe) createVoteDto: CreateVoteDto,
		@GetUser() user: UserType
	) {
		const poll = await this.votesService.vote(user, createVoteDto);
		pubSub.publish("optionVoted", poll);
		return poll;
	}

	@Mutation(returns => PollType)
	// @UseGuards(GraphqlAuthGuard)
	async unvote(@Args("id", ValidationPipe) id: String) {
		const poll = await this.votesService.unvote(id);
		pubSub.publish("optionVoted", poll);
		return poll;
	}

	@Subscription(returns => PollType, {
		name: "optionVoted",
		filter: (payload, variables) => payload.id === variables.id,
		resolve: value => value
	})
	async optionVoted(@Args("id") id: String) {
		return pubSub.asyncIterator("optionVoted");
	}
}
