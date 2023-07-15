const allowedCors = [
  'https://mesto.yuwarika.nomoredomains.xyz',
  'http://mesto.yuwarika.nomoredomains.xyz',
  'localhost:3000',
];

// eslint-disable-next-line func-names
module.exports = function (req, res, next) {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  if (allowedCors.includes(origin)) {
    res.headers('Access-Control-Allow-Origin', origin);
  }

  next();
};
