import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const corsOptions = {
	origin: 'http://client.localhost.com:8282',
	optionsSuccessStatus: 200,
	credentials: true,
}

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/login', (_, res) => {
	res.setHeader('Set-Cookie', 'token=123; Domain=server.localhost.com; SameSite=None; Path=/;')
	res.status(200).send('You are logged in!');
})

app.get('/message', (req, res) => {
	const token = req.cookies.token;
	if (token === '123') {
		res.json({message: 'Yo it\'s me, the server!'});
	} else {
		res.json({message: 'You are not logged in!'});
	}
});

app.listen(8181, () => {
	console.log('Server listening on port 8181');
})
