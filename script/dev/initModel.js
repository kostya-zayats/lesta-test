let version = '1.12.1';
let iframe = document.getElementById('api-frame');
let uid = '7c5b98b1b57841aba3048df45a13b8ea';
let eventCatcher = document.createElement('div');
eventCatcher.style.width = '100%';
eventCatcher.style.height = '100%';
eventCatcher.style.position = 'absolute';
iframe.parentNode.insertBefore(eventCatcher, iframe);
let client = new window.Sketchfab(version, iframe);

var success = function success(api) {
  api.start(function () {
    //Be carefull, the mouse can't be detected on the iframe
    //If you want to fix this, you have to put an overlay on the iframe
    document.body.addEventListener('mousemove', function (event) {
      // Calculate the location of the middle of the frame (Where we want the model to stay)
      let box = iframe.getBoundingClientRect();
      let frameX = box.left + box.width / 2;
      let frameY = box.top + box.height / 2;
      let x = event.pageX - frameX;
      let y = event.pageY - frameY;
      let z = 2;

      // Calculate the distance, normalize the vecteur by divising by distance and multiplicate by a factor
      let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
      x = x / distance * 15;
      y = y / distance * 15;
      z = z / distance * 15;

      api.getCameraLookAt(function(err, camera) {
        window.console.log(camera.position); // [x, y, z]
        window.console.log(camera.target); // [x, y, z]
      });

      // The disposition of x, y and z depend on how the model was made
      api.setCameraLookAt([y, -x, z], [0, -1.2, 0], 0);
    });
  });
  api.addEventListener('viewerready', function() {
    api.setCameraLookAt([0, -15, 0], [0, -1.2, 0], 0);
    document.getElementById('preload').classList.add('hidden');
  });
};
client.init(uid, {
  success: success,
  error: function onError() {
    console.log('Viewer error');
  },
  camera: 0
});