require('dotenv').config();
const express = require('express')
const app = express();
const PORT = process.env.PORT
const path = require('path')
var cors = require('cors')
app.use(cors(["localhost:5000", "localhost:3000"]));
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.e2j9o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

const allUsers = mongoose.model('allUsers', {
  name: String,
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
});

app.use(express.json())


app.use('/', express.static(path.join(__dirname, './web/build')));


app.post('/api/v1/login', (req, res) => {

  if (!req.body.email || !req.body.password) {
    res.status(403).send("required field missing");
    return;
  }
  else {
    allUsers.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).send("error occured");
      } else {
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then(result => {
              if (result) {
                console.log("result=> ", result);
                res.send({ msg: "Login successfull ✔", data: user });
              }
              else {
                console.log(err);
                res.send({ msg: "Password is incorrect ⚠", data: null })
              }
            })
        }
        else {
          res.send({ msg: "User does not exist ⚠", data: null });
        }
      }
    })
  }
})

app.post('/api/v1/signup', (req, res) => {

  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(403).send("required field missing");
    return;
  }
  else {
    allUsers.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).send("error occured");
      }
      else {
        if (user) {
          res.send({ msg: "user already exist ⚠", data: user });
        }
        else {
          bcrypt.genSalt().then(salt => {
            bcrypt.hash(req.body.password, salt).then(hash => {
              let newUser = new allUsers({
                name: req.body.name,
                email: req.body.email,
                password: hash
              })
              newUser.save(() => {
                res.send({ msg: "profile created ✔", data: null });
              })
            })
          })
        }
      }
    })
  }
})


app.get("/**", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./web/build/index.html"))
  // res.redirect("/")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})