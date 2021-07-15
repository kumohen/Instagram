let express = require("express")
   let mongoose = require('mongoose')
   let cors = require('cors')
   let  bodyParser = require('body-parser')
    const { MONGO_URI } = require("./keys");
   

// const api = require('./backend/routes')

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
  });
  mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
  });

const app = express();
app.use(express.json())
app.use(cors());

app.use('/public', express.static('public'));

app.use('/api/users', require("./routes/user_route"))
app.use('/api/posts', require("./routes/post_route"))
app.use('/api/saves', require("./routes/save_route"))

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});