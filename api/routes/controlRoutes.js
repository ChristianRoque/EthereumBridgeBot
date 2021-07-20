module.exports = function (app) {
  var contract = require("../controllers/controlPanelControllers");

  app.route("/firstContract").get(contract.ethereumContract);
};
