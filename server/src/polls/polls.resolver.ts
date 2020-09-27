import { Resolver, Query, Mutation, Args, Subscription } from "@nestjs/graphql";
import { PollType } from "./poll.type";
import { PollsService } from "./polls.service";
import { CreatePollDto } from "./dto/create-poll.dto";
import { PubSub } from "graphql-subscriptions";
import { ValidationPipe, UseGuards } from "@nestjs/common";
import { GetPollsFilterDto } from "./dto/get-polls-filter.dto";
import { GetPollsSortDto } from "./dto/get-polls-sort.dto";
import { GraphqlAuthGuard } from "src/auth/graphql-auth.guard";
import { GetUser } from "src/auth/get-user.decorator";
import { UserType } from "src/users/user.type";

const pubSub = new PubSub();

@Resolver("Polls")
export class PollsResolver {
	constructor(private readonly pollsService: PollsService) {}

	@Query(returns => [PollType])
	async polls(
		@Args("filters", ValidationPipe) getPollsFilterDto: GetPollsFilterDto
	) {
		return this.pollsService.getAll(getPollsFilterDto);
	}

	@Query(returns => PollType)
	async poll(@Args("id", ValidationPipe) id: String) {
		const poll = this.pollsService.findById(id);
		return poll;
	}

	@Mutation(returns => PollType)
	@UseGuards(GraphqlAuthGuard)
	async createPoll(
		@Args("input", ValidationPipe) createPollDto: CreatePollDto,
		@GetUser() user: UserType
	) {
		const poll = await this.pollsService.create(user, createPollDto);

		if (!poll.private) pubSub.publish("newPoll", poll);

		return poll;
	}

	@Mutation(returns => Boolean)
	@UseGuards(GraphqlAuthGuard)
	async delete(@Args("id") id: String) {
		return await this.pollsService.delete(id);
	}

	@Subscription(returns => PollType, {
		name: "newPoll",
		resolve: value => value
	})
	async optionVoted() {
		return pubSub.asyncIterator("newPoll");
	}
}
