import jsonwebtoken from 'jsonwebtoken';
import ENV from '$src/env';
import db from '$lib/db';
import { sequence } from '@sveltejs/kit/hooks';
import RestrictedPaths from '$src/restrictedPaths.js';

import '$src/routes/api/aboutUs/Model';
import '$src/routes/api/action/Model';
import '$src/routes/api/admin/Model';
import '$src/routes/api/blog/Model';
import '$src/routes/api/blogCat/Model';
import '$src/routes/api/blogsPage/Model';
import '$src/routes/api/faq/Model';
import '$src/routes/api/general/Model';
import '$src/routes/api/homePage/Model';
import '$src/routes/api/language/Model';
import '$src/routes/api/referenceLogo/Model';
import '$src/routes/api/review/Model';
import '$src/routes/api/staff/Model';
import '$src/routes/api/translate/Model';
import '$src/routes/api/treatment/Model';
import '$src/routes/api/treatmentGroup/Model';
import '$src/routes/api/Model';

import { json } from '@sveltejs/kit';
let mongooseConnectionStates = {
	0: 'disconnected',
	1: 'connected',
	2: 'connecting',
	3: 'disconnecting',
	4: 'invalid_credentials'
};

/** @type {import('@sveltejs/kit').Handle} */
const jwtHandle = async ({ event, resolve }) => {
	if (event.url.pathname.indexOf('api') != -1) {
		console.log(
			'ready state: ',
			mongooseConnectionStates[db.connection.readyState],
			'- connections length: ',
			db.connections.length
		);
		if (db?.connection?.readyState != 1) {
			if (db?.connection?.readyState == 2) {
				console.log('start trying to connecting');
				await new Promise((resolve) => {
					let intervalForConnection = setInterval(() => {
						if (db?.connection?.readyState == 1) {
							clearInterval(intervalForConnection);
							resolve();
						}
					}, 20);
				});
				console.log('finished trying to connecting');
			} else {
				console.log('db if condition before', db?.connection?.readyState);
				await db.connect(ENV.DATABASE.connection_url);
				console.log('db if condition after', db?.connection?.readyState);
			}
		}
	}
	try {
		const jwt = event.cookies.get('jwt');

		event.locals.user = jwt ? jsonwebtoken.verify(jwt, ENV.JWT_SECRET) : null;

		return resolve(event);
	} catch (error) {
		console.log(
			'hooks error:',
			error.message,
			'db status: ',
			mongooseConnectionStates[db.connection.readyState]
		);
		return resolve(event);
	}
};

const authHandle = async ({ event, resolve }) => {
	console.log('restrictedKey: ', `${event.request.method}:${event.url.pathname}`);

	if (
		RestrictedPaths.paths[`${event.request.method}:${event.url.pathname}`] &&
		!event.locals.user
	) {
		return json(
			{
				status: false,
				message: 'You do not have permission for this route.'
			},
			{ status: 401 }
		);
	}

	return resolve(event);
};

export const handle = sequence(jwtHandle, authHandle); 
