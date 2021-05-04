const express = require("express"); // importing expresss
const fs = require("fs"); // fs for file read operation

// creating app object and using json middleware provided by express
const app = express();
app.use(express.json());

// variables for http server connection
const HOST = "localhost";
const PORT = 3000;

// base get route
app.get("/", (req, res) => {

  
  res.send('<h1 style="color:orange ; font-size:100px;" > Practical No:6. </h1>');
});

//class route
app.get("/class", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./class.json"));
  const result = {
    message: "Subjetcs AND Batches",
    data,
  };
  res.send(result);
});

//batch route with param id
app.get("/class/batch/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./class.json"));
  var myBatch = {};
  data.subjects.map((batch) => {
    if (batch.id == req.params.id) myBatch = batch;
  });
  console.log(myBatch);
  const result = {
    message: "Following is the your batch along with subject.",
    data:myBatch ,
  };
  res.send(result);
});

//pattern matching route
app.get("/*ik", (req, res) => {
  res.send('<h1 style="color:yellow; ">It  matches with any route which ends with ik.</h1>');
});

// Make server listen on given HOST and PORT
app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`));
