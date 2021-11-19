// DEPENDENCIES
const express = require("express");
const fs = require("fs");
const path = require("path");
// SERVER DEPENDENCIES
const app = express();
const PORT = process.env.PORT || 3000;
// EXPRESS DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// ROUTES FOR NOTES.HTML & INDEX.HTML
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// SERVER FUNCTIONS
app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, readNotes) {
        if (err) {
            throw err;
        } else {
            readNotes = JSON.parse(readNotes);
            let noteID = readNotes.length;
            let addNote = {
                id: noteID,
                title: req.body.title,
                text: req.body.text,
            };
            let concatNote = readNotes.concat(addNote);
            fs.writeFile(
                __dirname + "/db/db.json",
                JSON.stringify(concatNote),
                function (err, data) {
                    if (err) throw err;
                    res.json(concatNote);
                }
            );
        }
    });
});
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});
// SERVER LISTEN
app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));
