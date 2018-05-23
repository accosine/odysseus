import codegen from 'babel-plugin-codegen/macro';

export default codegen`
const { application: { plugins } } = require('./config.json');
// console.log(plugins);
module.exports = '[' + (plugins || []).map(plugin => "require('" + plugin + "')").join(', ') + ']';
`;
