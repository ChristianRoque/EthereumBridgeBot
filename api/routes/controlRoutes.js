module.exports = function (app) {
  var contract = require("../controllers/controlPanelControllers");

  app.route("/balance").get(contract.getContractBalance);
  app.route("/fund").get(contract.fundContract);
};
