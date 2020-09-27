export default function({ app, store, redirect, route }) {
	if (!store.getters["user/isLoggedIn"]) {
		return redirect("/signin", {
			next: route.fullPath
		});
	}
}
