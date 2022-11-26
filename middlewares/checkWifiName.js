const wifiName = require('wifi-name');

const resGenerator = require('../utils/resGenerator');

const checkWifiName = (req, res, next) => {
  const { audience } = req.body;
  if (audience === 'LMS-1') return next();
  return wifiName().then(name => {
    console.log(name);
    if (name !== ('sfedu-stud' || 'sfedu' || 'sfedu-conf')) return resGenerator(res, 400, { message: 'You are not connected to sfedu wifi!' });
    next();
  });
};

module.exports = checkWifiName;
