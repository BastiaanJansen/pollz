import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PollSchema } from "src/polls/poll.schema";
import { VotesService } from "./votes.service";
import { PollsModule } from "src/polls/polls.module";
import { VotesResolver } from "./votes.resolver";
import { VoteSchema } from "./vote.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Poll", schema: PollSchema },
			{ name: "Vote", schema: VoteSchema }
		]),
		PollsModule
	],
	exports: [VotesService],
	providers: [VotesService, VotesResolver]
})
export class VotesModule {}
