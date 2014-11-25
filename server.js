var connect = require ('connect'),
    serveStatic = require('serve-static'),
    app = connect(),
    port = 8080;

app.use(serveStatic("."));
app.listen(port);
console.log("Running server on port " + port + ".")
