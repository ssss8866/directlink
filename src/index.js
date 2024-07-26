import * as _123 from "./function/123.js";
import * as tyy from "./function/189cloud.js";

export default {
	async fetch(request, env, _ctx) {
		const url = new URL(request.url);
		const Type = url.pathname;
		const Key = url.search;

		switch(Type) {
			case "/123": return Response.redirect(await _123.getUrl(env, Key));
			case "/tyy": return Response.redirect(await tyy.getUrl(env, Key));
		}
	}
}