// DEPENDENCIES
const express = require("express");
const fs = require("fs");
const path = require("path");
// SERVER DEPENDENCIES
const app = express();
const PORT = process.env || 3000;
// EXPRESS DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// ROUTES FOR NOTES.HTML & INDEX.HTML
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '/notes.html'))
});
app.get('/notes', function(req,res) {
res.sendFile(path.join(__dirname, '/notes.html'))
});
// SERVER FUNCTIONS
app.get('/api/notes', function(req,res) {
    
})