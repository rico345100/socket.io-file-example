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

	function start() {
		console.log('Upload started');
	}
	function stream(data) {
		console.log('Streaming... ' + data.uploaded + ' / ' + data.size);
	}
	function complete(data) {
		if(data.uploadTo === 'image') {
			console.log('image uploaded');
		}
		else {
			console.log('music uploaded');
		}
	}

	var imageUploader = new SocketIOFile(socket, {
		uploadDir: {
			image: 'userdata/image',
			music: 'userdata/music'
		}
	});

	imageUploader.on('start', start);
	imageUploader.on('stream', stream);
	imageUploader.on('complete', complete);
});