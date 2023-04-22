var iframe = document.getElementById( 'api-frame' );
var uid = '7c5b98b1b57841aba3048df45a13b8ea';

// By default, the latest version of the viewer API will be used.
var client = new Sketchfab( iframe );

// Alternatively, you can request a specific version.
// var client = new Sketchfab( '1.12.1', iframe );

client.init( uid, {
  success: function onSuccess( api ){
    api.start();
    api.addEventListener( 'viewerready', function() {

      // API is ready to use
      // Insert your code here
      console.log( 'Viewer is ready' );

    } );
  },
  error: function onError() {
    console.log( 'Viewer error' );
  }
} );