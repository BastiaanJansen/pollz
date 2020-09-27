import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserType } from "./user.type";
import { Model } from "mongoose";
import { CreateUserDto } from "../auth/dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel("User") private readonly userModel: Model<UserType>
	) {}

	async findById(id: String) {
		return this.userModel.findById(id);
	}
}
