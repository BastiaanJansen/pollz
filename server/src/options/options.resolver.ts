import { Resolver, Query, Mutation, Args, Subscription } from "@nestjs/graphql";
import { OptionsService } from "./options.service";
import { OptionType } from "./option.type";
import { PollType } from "src/polls/poll.type";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver("Options")
export class OptionsResolver {
	constructor(private readonly optionsService: OptionsService) {}

	// @Mutation(returns => PollType)
	// async vote(@Args("id") id: String) {
	// 	const poll = await this.optionsService.vote(id);
	// 	pubSub.publish("optionVoted", poll);
	// 	return poll;
	// }

	// @Mutation(returns => PollType)
	// async unvote(@Args("id") id: String) {
	// 	const poll = await this.optionsService.unvote(id);
	// 	pubSub.publish("optionVoted", poll);
	// 	return poll;
	// }

	@Subscription(returns => PollType, {
		name: "optionVoted",
		filter: (payload, variables) => payload.id === variables.id,
		resolve: value => value
	})
	async optionVoted(@Args("id") id: String) {
		return pubSub.asyncIterator("optionVoted");
	}
}
