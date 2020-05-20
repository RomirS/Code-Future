const expressConfig = require("./expressConfig");
const app = expressConfig();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 8080;
module.exports = function() { http.listen(PORT, () => console.log(`Server running on port ${PORT}`)); };