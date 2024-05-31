/**
 * ExpressJS
 * 
 * @package VehicleAPI
 * @author  tanchevskit
 */
const app = require('./bootstrap/app');

require('./bootstrap/config');
require('./database/mongodb').connect();

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
