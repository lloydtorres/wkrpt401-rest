let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
  console.log("/api/ called.")
  res.json({ response: "API Operational "})
})

var requestCount = 0

router.post('/best-personality', function(req, res) {
  let userData = req.body;
  let name = userData.name;
  let level = userData.level;

  var maxPersonalityName = "";
  var maxPersonalityValue = -1;
  for (var i in userData.personality) {
    let personalityName = userData.personality[i].name;
    let personalityValue = userData.personality[i].amount;
    if (personalityValue > maxPersonalityValue) {
      maxPersonalityName = personalityName;
      maxPersonalityValue = personalityValue;
    }
  }

  let response = "The best personality attribute for " + name
                    + " (Lv. " + level + ") is "
                    + maxPersonalityName + " @ "
                    + maxPersonalityValue;

  requestCount++
  console.log("/api/best-personality called with response '" + response + "'" + " (request #" + requestCount + ")");
  res.json({ response: response });
});

app.use('/api', router);

if (module === require.main) {
  let server = app.listen(50069, function() {
    console.log("WKRPT401 REST API starting on port " + server.address().port);
  });
}
module.exports = app;
