import * as _123 from "./function/123.js";
import * as _189 from "./function/189.js";

export default {
	async fetch(request, env, _ctx) {
		const url = new URL(request.url);
		const Type = url.pathname;
		const Key = url.search;

		switch(Type) {
			case "/123": return Response.redirect(await _123.getUrl(env, Key));
			case "/189": return Response.redirect(await _189.getUrl(env, Key));
		}
	}
}