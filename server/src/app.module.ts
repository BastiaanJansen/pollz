import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { PollsModule } from "./polls/polls.module";
import { MongooseModule } from "@nestjs/mongoose";
import { OptionsModule } from "./options/options.module";
import config from "config";
import { join } from "path";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { VotesService } from "./votes/votes.service";
import { VotesModule } from "./votes/votes.module";

const dbConfig = config.get("db");

@Module({
	imports: [
		GraphQLModule.forRoot({
			playground: true,
			installSubscriptionHandlers: true,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			context: ({ req }) => ({ req })
		}),
		MongooseModule.forRoot(
			`mongodb://mongo:27017/pollz`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		),
		PollsModule,
		OptionsModule,
		UsersModule,
		AuthModule,
		VotesModule
	],
	controllers: [],
	providers: []
})
export class AppModule { }
