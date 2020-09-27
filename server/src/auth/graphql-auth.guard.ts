// import {
// 	ExecutionContext,
// 	Injectable,
// 	CanActivate,
// 	UnauthorizedException
// } from "@nestjs/common";
// import { GqlExecutionContext } from "@nestjs/graphql";
// import { AuthGuard } from "@nestjs/passport";
// import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

// @Injectable()
// export class GqlAuthGuard extends AuthGuard("jwt") {
// 	canActivate(context: ExecutionContext) {
// 		const ctx = GqlExecutionContext.create(context);
// 		const { req } = ctx.getContext();

// 		return super.canActivate(new ExecutionContextHost([req]));
// 	}

// 	handleRequest(err: any, user: any) {
// 		if (err || !user) {
// 			throw err || new UnauthorizedException();
// 		}
// 		return user;
// 	}
// }

import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

@Injectable()
export class GraphqlAuthGuard extends AuthGuard("jwt") {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = GqlExecutionContext.create(context);
		const { req } = ctx.getContext();
		return super.canActivate(new ExecutionContextHost([req]));
	}
}

// @Injectable()
// export class AuthGuard implements CanActivate {
// 	canActivate(context: ExecutionContext): boolean {
// 		const ctx = GqlExecutionContext.create(context);
// 		return true;
// 	}
// }
