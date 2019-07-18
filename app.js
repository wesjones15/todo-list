var bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express()
    // mongoose    = require("mongoose")
    
// var todoSchema = new mongoose.Schema({
//     entry: String,
//     details: String,
//     taskComplete: {type: Boolean, default: false}
// });

var todos = ["Walk Tucker", "Take Shower", "Drink Coffee"];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home", {todos: todos});
});

app.get("/new", function(req, res) {
    res.render("new");
});

app.post("/", function(req, res) {
    var newTodo = req.body.entry;
    todos.push(newTodo);
    res.redirect("/");
});


app.listen(3000, function() {
    console.log("Server listening on port 3000");
});