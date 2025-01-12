export async function getTimestamp() {

    const response = await fetch("https://www.123pan.com/b/api/get/server/time");
	const res_json = await response.json();
	const timestamp = res_json.data.timestamp;

    return timestamp;
}

export function crc32(str) {

	let crc = 0xFFFFFFFF;
	for (let i = 0; i < str.length; i++) {
		crc ^= str[i];
		for (let j = 0; j < 8; j++) {
			if ((crc & 1) !== 0) crc = (crc >>> 1) ^ 0xEDB88320;
			else crc >>>= 1;
		}
	}
	crc ^= 0xFFFFFFFF;
	return crc >>> 0;
}

export async function md5(str) {

	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	const hashBuffer = await crypto.subtle.digest('MD5', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const md5 =  hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

	return md5;
}