import { Hono } from 'Hono';
import { supabase } from '../../db/client.js';

const refreshRoute = new Hono();

refreshRoute.post('/refresh', async (c) => {
	const req = await c.req.json();

	const { data, error } = await supabase.auth.refreshSession(req);

	if (error) {
		console.log(error);
		return c.json({ meesage: error }, 400);
	}

	const { session } = data;

	return c.json({ session }, 200);
});

export default refreshRoute;
