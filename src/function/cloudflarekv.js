export async function getUrl(Key, env) {
    const rule = /\?(.*)/;
    const key = Key.match(rule)[1];
    return await env.DB.get(key);
}