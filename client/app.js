var socket = io('http://localhost:3000');
var uploader = new SocketIOFileClient(socket);
var form = document.getElementById('form');

uploader.on('ready', function() {
	console.log('SocketIOFile ready to go!');
});
uploader.on('loadstart', function() {
	console.log('Loading file to browser before sending...');
});
uploader.on('progress', function(progress) {
	console.log('Loaded ' + progress.loaded + ' / ' + progress.total);
});
uploader.on('start', function(fileInfo) {
	console.log('Start uploading', fileInfo);
});
uploader.on('stream', function(fileInfo) {
	console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
});
uploader.on('complete', function(fileInfo) {
	console.log('Upload Complete', fileInfo);
});
uploader.on('error', function(err) {
	console.log('Error!', err);
});
uploader.on('abort', function(fileInfo) {
	console.log('Aborted: ', fileInfo);
});

form.onsubmit = function(ev) {
	ev.preventDefault();
	
	// Send File Element to upload
	var fileEl = document.getElementById('file');
	// var uploadIds = uploader.upload(fileEl);

	// Or just pass file objects directly
	var uploadIds = uploader.upload(fileEl.files);
};