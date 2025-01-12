import * as utils from './utils';

export async function flashCache(env) {

    const cacheKey = await env.KV.list({"prefix": "Cache/"});
    for(const element of cacheKey.keys) {

        const type = element.name.split('/')[1];
        const encodedValue = await env.KV.get(element.name);
        const cacheTimestamp = Number(atob(encodedValue).split('|')[1]);
        const nowTimestamp = Number(await utils.getTimestamp());

        switch(type) {
            case "123": if((nowTimestamp - cacheTimestamp) > 86400) await env.KV.delete(element.name);break;
            case "189": if((nowTimestamp - cacheTimestamp) > 1080) await env.KV.delete(element.name);break;
            case "lzy": if((nowTimestamp - cacheTimestamp) > 900) await env.KV.delete(element.name);break;
        }
    }
}

export async function addCache(cache, env) {

    await flashCache(env);

    let cacheKeyArray = [];
    cacheKeyArray[0] = cache.key.sharekey;
    cacheKeyArray[1] = cache.key.password;
    const cacheKey = "Cache" + cache.type + '/' + utils.crc32(cacheKeyArray.join('|')).toString();

    let cacheValue = [];
    cacheValue[0] = cache.url;
    cacheValue[1] = await utils.getTimestamp();
    const encodedValue = btoa(cacheValue.join('|'));

    await env.KV.put(cacheKey, encodedValue);
}

export async function getCache(type, key, env) {

    await flashCache(env);

    let cacheKeyArray = [];
    cacheKeyArray[0] = key.sharekey;
    cacheKeyArray[1] = key.password;
    const cacheKey = "Cache" + type + '/' + utils.crc32(cacheKeyArray.join('|')).toString();

    let cache = {};
    cache.code = 400;
    const encodedValue = await env.KV.get(cacheKey);
    if(encodedValue) {
        
        const cacheValue = atob(encodedValue).split('|');
        cache.code = 0;
        cache.type = type;
        cache.key = {};
        cache.key.sharekey = key.sharekey;
        cache.key.password = key.password;
        cache.url = cacheValue[0];
    }

    return cache;
}