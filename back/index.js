const express = require('express');
const cors = require('cors');
const app = express(); 
const axios = require('axios');
const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://nithinmoorthy11:Hello123@nithin-database.uedih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true}) // connect to our database

mongoose.connection.once('open', function() {
    console.log("CONNECTED TO DB");
})

app.use(cors());

const studentSchema = new Schema({
    name: String,
    id: Number
})
const StudentModel = mongoose.model("Students", studentSchema);

app.get("/", async function(req,res) {
        var options = {
        method: 'GET',
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        params: {q: 'taylor swift', pageNumber: '1', pageSize: '10', autoCorrect: 'true'},
        headers: {
            'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
            'x-rapidapi-key': '9c416f5e25msh852fbd97ef4d6e5p1974d9jsnd427cb8a4b24'
        }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
});
})
app.put("/submit", async function(req,res) {
    console.log("NAME: ", req.body.name);
    console.log("ID: ", req.body.id);
    const studentObj = {
        names: req.body.name,
        id: req.body.id
    };
    const student =  await StudentModel.create(studentObj);
    console.log("DB RESPONSE: ", student);
    res.send({message: "Hello"})
})

app.listen("3001", function(req,res) {
    console.log("Listening to PORT 3001");
})




