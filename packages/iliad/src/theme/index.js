import codegen from 'babel-plugin-codegen/macro';

export default codegen`
const config = require('../config.json');
module.exports = "require('" + config.application.theme + "').default"
`;
