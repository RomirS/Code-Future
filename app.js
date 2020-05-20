const expressConfig = require("./utils/expressConfig");
const serverConfig = require("./utils/serverConfig");
const app = expressConfig();

const index = require("./src/index");
serverConfig();

app.get('/', index);