var socket = io('http://localhost:3000');

window.addEventListener('load', function() {
	var socketIOFile = new SocketIOFileClient(socket);

	function streaming(data) {
		console.log('SocketIOFileClient: Client streaming... ' + data.uploaded + ' / ' + data.size);
	}

	function complete(data) {
		console.log('File Uploaded Successfully!');
		console.log(data);
	}

	function error(data) {
		console.log('Error while uploading:');
		console.log(data);
	}

	socketIOFile.on('stream', streaming);
	socketIOFile.on('complete', complete);
	socketIOFile.on('error', error);

	document.getElementById('uploadImage').addEventListener('click', function() {
		var file = document.getElementById('fileImage').files[0];
		socketIOFile.upload(file, {
			types: [
				'image/png',
				'image/jpeg',
				'image/pjpeg'
			],
			to: 'image'
		});
	});

	document.getElementById('uploadMusic').addEventListener('click', function() {
		var file = document.getElementById('fileMusic').files[0];
		socketIOFile.upload(file, {
			types: [
				'audio/mp3'
			],
			to: 'music'
		});
	});
});