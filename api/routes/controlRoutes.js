module.exports = function (app) {
  var controllers = require("../controllers/controlPanelControllers");

  app.route("/firstContract").get(controllers.firstContractInfo);
  app.route("/secondContract").get(controllers.secondContractInfo);
};
