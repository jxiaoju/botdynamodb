let dynogels = require('dynogels');
let ModelAction = require('./src/action');

let getModels = option => {
  let { tables, port, region } = option;
  if (typeof tables !== 'object' || !region) {
    return;
  }
  if (port) {
    dynogels.AWS.config.update({
      endpoint: `http://localhost:${port}`,
      region
    });
  } else {
    dynogels.AWS.config.update({ region });
  }
  let keys = Object.keys(tables);
  let out = {};
  keys.forEach(key => {
    let obj = tables[key];
    let model = dynogels.define(obj.tableName, obj);
    out[key] = new ModelAction(model);
  });
  return out;
};

module.exports = getModels;
