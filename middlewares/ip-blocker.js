module.exports = function (whiteList, BlackList) {
  return function (req, res, next) {
    let isAllowed;
    if (whiteList && whiteList.length > 0) {
      isAllowed = whiteList.findIndex((ip) => ip === req.ip) !== -1;
    } else {
      isAllowed = BlackList.findIndex((ip) => ip === req.ip) === -1;
    }

    if (!isAllowed) {
      return res.status(403).send("Access denied");
    }

    next();
  };
};
