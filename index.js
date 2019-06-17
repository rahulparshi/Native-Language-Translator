//setting the express app
const express = require("express");
const translate = require("@vitalets/google-translate-api");
const languages = require("@vitalets/google-translate-api/languages");
const bodyParser = require("body-parser");

const app = express();
const PORT_NUMBER = process.env.PORT || 5000;
app.listen(PORT_NUMBER, function() {
  console.log("Connected listening for requests on port " + PORT_NUMBER);
});
app.set("view engine", "ejs");
app.use(express.static("public"));

const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

const delay = require("delay");

app.get("/", function(req, res) {
  res.render("index", { languages: languages });
});

app.post("/translate", urlencodedParser, function(req, res) {
  console.log(req.body);
  (async () => {
    var converted_text = null;
    translate(req.body.text, {
      client: "gtx",
      from: req.body.from_language,
      to: req.body.to_language
    })
      .then(res => {
        converted_text = res.text;
      })
      .catch(err => {
        console.error(err);
      });

    await delay(1500);

    // Executed 100 milliseconds later
    res.end('{"value":"' + converted_text + '"}');
  })();
});
