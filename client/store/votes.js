import gql from "graphql-tag";

export const state = () => ({
	votes: []
});

export const mutations = {
	addVote(state, { pollId, optionId }) {
		state.votes.push({
			pollId,
			optionId,
			votedAt: new Date()
		});
	}
};

export const actions = {
	async ADD_VOTE({ commit }, { pollId, optionId }) {
		commit("addVote", { pollId, optionId });
	}
};

export const getters = {
	getVote: state => pollId => {
		return state.votes.find(vote => vote.pollId === pollId);
	}
};
