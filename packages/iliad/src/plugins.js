import codegen from 'babel-plugin-codegen/macro';
// asdf

export default codegen`
const { application: { plugins } } = require('./config.json');
module.exports = '[' + (plugins || []).map(plugin => "require('" + plugin + "')").join(', ') + ']';
`;
