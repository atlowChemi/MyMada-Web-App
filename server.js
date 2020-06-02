var express = require("express");

app = express();
app.use(express.static(__dirname + "/dist"));
app.all("*", (_req, res) => {
    try {
        res.sendFile(__dirname + "/dist/index.html");
    } catch (error) {
        res.json({ success: false, message: "Something went wrong" });
    }
});
var port = process.env.PORT || 5006;
app.listen(port);
console.log("server started " + port);
