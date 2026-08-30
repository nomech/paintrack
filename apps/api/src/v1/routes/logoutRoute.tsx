import { Hono } from 'Hono';
import { supabase } from '../../db/client.js';

const logoutRoute = new Hono();

logoutRoute.post('/login', async (c) => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log(error);
		return c.json(error, 400);
	}

	return c.json({ message: 'Logout successful' }, 200);
});

export default logoutRoute;
