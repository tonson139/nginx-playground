const express = require('express');
const logger = require('morgan');

const port = process.env.PORT;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => {
	res.status(200).json({
		server: port,
		method: req.method,
		url: req.url,
		reqHeader: req.headers,
		reqBody: req.body,
	});
});

app.get('/user', (req, res) => {
	res.status(200).json({
		server: port,
		method: req.method,
		url: req.url,
		reqHeader: req.headers,
		reqBody: req.body,
	});
});

app.post('/user', (req, res) => {
	res.status(200).json({
		server: port,
		method: req.method,
		url: req.url,
		reqHeader: req.headers,
		reqBody: req.body,
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

