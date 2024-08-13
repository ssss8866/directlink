export async function getUrl(Key, env) {
    return await env.DB.get(Key);
}