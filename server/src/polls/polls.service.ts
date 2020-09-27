import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PollType } from "./poll.type";
import { Model } from "mongoose";
import { CreatePollDto } from "./dto/create-poll.dto";
import * as mongoose from "mongoose";
import { GetPollsFilterDto } from "./dto/get-polls-filter.dto";
import { GetPollsSortDto } from "./dto/get-polls-sort.dto";
import { UserType } from "src/users/user.type";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PollsService {
	constructor(
		@InjectModel("Poll") private readonly pollModel: Model<PollType>,
		private readonly usersService: UsersService
	) {}

	async getAll(getPollsFilterDto: GetPollsFilterDto): Promise<PollType[]> {
		const filters = {};

		if (getPollsFilterDto.private != null)
			filters["private"] = getPollsFilterDto.private;

		if (getPollsFilterDto.userId)
			filters["user"] = await this.usersService.findById(
				getPollsFilterDto.userId
			);

		const sort = {
			createdAt: -1
		};

		const polls = await this.pollModel
			.find(filters)
			.sort(sort)
			.populate(["user", "options.votes.user"]);

		return polls;
	}

	async findById(id: String) {
		const poll = await this.pollModel
			.findById(id)
			.populate(["user", "options.votes.user"]);

		return poll;
	}

	async create(user: UserType, createPollDto: CreatePollDto) {
		const poll = new this.pollModel({
			question: createPollDto.question,
			options: createPollDto.options,
			private: createPollDto.private,
			user: user._id
		}).populate("user");

		poll.execPopulate();

		return poll.save();
	}

	async delete(id: String) {
		return await this.pollModel.findOneAndDelete(id);
	}
}
