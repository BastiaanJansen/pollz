import { Module } from "@nestjs/common";
import { PollsResolver } from "./polls.resolver";
import { PollsService } from "./polls.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PollSchema } from "./poll.schema";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Poll", schema: PollSchema }]),
		AuthModule,
		UsersModule
	],
	exports: [PollsService],
	providers: [PollsResolver, PollsService]
})
export class PollsModule {}
