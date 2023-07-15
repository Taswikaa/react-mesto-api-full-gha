const allowedCors = [
  'https://mesto.yuwarika.nomoredomains.xyz',
  'http://mesto.yuwarika.nomoredomains.xyz',
  'localhost:3000',
];

// eslint-disable-next-line func-names
module.exports = function (req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.headers('Access-Control-Allow-Origin', origin);
  }

  next();
};
