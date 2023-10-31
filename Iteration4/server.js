const path = require("path");
const express = require("express");
const app = express();
const options = {
    root: path.join(__dirname, "/")
};
//uses style sheets inside public
app.use(express.static('public'))

// With express, you define handlers for routes.
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
})
// app.get("/:filename", (req, resp) => {
//     resp.sendFile(req.params.filename, options, (err) => {
// 	if (err) {
// 	    console.log(err);
// 	    resp.status(404).send("File Not Found");
// 	}
// 	else {
// 	    console.log("Sent:", req.params.filename);
// 	}
//     });
// });

app.listen(8080, () => {
    console.log("Tunity webpage on port 8080");
});
