var g = require("node-github");
var prompt = require('prompt');

var properties = [
    {
        name: 'username', 
        validator: /^[a-zA-Z\.\-]+$/,
        warning: 'Username must be only letters, dots, or dashes'
    },
    {
        name: 'password',
        hidden: true
    }
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    setupHook(result.username, result.password);
    console.log("done");
});

function onErr(err) {
    console.log(err);
    return 1;
}

function setupHook(username, password){
    var github = new g({
         version: "3.0.0",
         timeout: 5000
    });

    github.authenticate({
        type : "basic",
        username : username,
        password : password,
    });

    github.repos.createHook({
        user: username,
        repo: "hook-test",
        name: "web",
        config: {
                "url": "http://ptett.se:8080/github",
                "content_type": "json"
        }
    }, function(){
        console.log(arguments);
    });
}

