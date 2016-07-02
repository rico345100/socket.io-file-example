"strict mode";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const SocketIOFile = require('socket.io-file');

http.listen(3000, () => {
	console.log('Server listening on *:3000');
});

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules/socket.io-client'));
app.use(express.static(__dirname + '/node_modules/socket.io-file-client'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
	console.log('connected: ' + socket.id);

	var uploader = new SocketIOFile(socket, {
		uploadDir: 'data/music'
	});

	uploader.on('start', (fileInfo) => {
		console.log('Upload started');
	});
	uploader.on('stream', (data) => {
		console.log('Streaming... ' + data.uploaded + ' / ' + data.size);
	});
	uploader.on('complete', () => {
		console.log('Completed!');
	});
});