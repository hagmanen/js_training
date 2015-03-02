requirejs.config({
    "baseUrl": "js/libs",
    "paths": {
      "app": "../app",
      "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min",
      "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min",
      "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min"
    }
});


requirejs(["app/main"]);
