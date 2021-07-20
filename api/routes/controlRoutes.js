module.exports = function (app) {
  var contract = require("../controllers/controlPanelControllers");

  app.route("/firstContract").get(contract.ethereumContract);
  app.route("/secondContract").get(contract.binanceContract);
};
