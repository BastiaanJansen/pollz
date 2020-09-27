import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OptionsService } from "./options.service";
import { OptionsResolver } from "./options.resolver";
import { PollSchema } from "../polls/poll.schema";
import { PollsModule } from "src/polls/polls.module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Poll", schema: PollSchema }]),
		PollsModule
	],
	exports: [],
	providers: [OptionsResolver, OptionsService]
})
export class OptionsModule {}
