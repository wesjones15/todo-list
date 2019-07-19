var bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    methodOverride  = require("method-override");

    
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// var todos = ["Walk Tucker", "Take Shower", "Drink Coffee"];

// App Config
mongoose.connect("mongodb+srv://Wes:WPWDnvlErs3Dujne@todo-list-nefpq.mongodb.net/test?retryWrites=true&w=majority");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Defining Mongoose Schema
var todoSchema = new mongoose.Schema({
    entry: String,
    priority: Number,
    details: String,
    taskComplete: {type: Boolean, default: false}
});

var Todo = mongoose.model("Todo", todoSchema);


// Home route
app.get("/", function(req, res) {
    Todo.find({}, function(err, todos) {
        if (err) {
            console.log("LOADING ERROR: " + err);
        } else {
            res.render("home", {todos: todos});
        }
    });
});


// New route
app.get("/new", function(req, res) {
    res.render("new");
});


// Create route
app.post("/", function(req, res) {
    Todo.create(req.body.todo, function(err, newTodo) {
        if (err) {
            console.log("CREATE ERROR: " + err);
        } else {
            res.redirect("/");
        }
    });
});


// Show route 
// Currently shows plain json object 
app.get("/:id", function(req, res) {
    Todo.findById(req.params.id, function(err, foundTodo) {
        if (err) {
            console.log("SHOW PAGE ERROR: " + err);
        } else {
            res.render("show", {todos:foundTodo});
        }
    });
});

// Edit route in future
// Update route in future



// Delete route
app.delete("/:id", function(req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err) {
        res.redirect("/");
    });
});


app.listen(3000, function() {
    console.log("Server listening on port 3000");
});