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

app.get("/", function(req, res) {
  res.render("index", { languages: languages });
});

app.post("/translate", urlencodedParser, function(req, res) {
  let converted_text = null;
  (async () => {
    try {
      result = await translate(req.body.text, {
        client: "gtx",
        from: req.body.from_language,
        to: req.body.to_language
      });
      res.end('{"value":"' + result.text + '"}');
    } catch (ex) {
      console.log(ex);
    }
  })();
});
