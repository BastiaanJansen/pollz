export default function({ $axios, redirect, store }) {
	$axios.defaults.baseURL = "localhost:3000/graphql";
	// $axios.defaults.headers.Authorization = store.state.auth.token;

	if (process.env.NODE_ENV == "development") {
		$axios.onRequest(config => {
			console.log("Making request to " + config.url);
		});
	}

	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status);
	});
}
