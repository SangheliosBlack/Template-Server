module.exports = function trimJSONValues(req, res, next) {
    const traverse = (obj) => {
      for (let prop in obj) {
        if (typeof obj[prop] === 'string') {
          obj[prop] = obj[prop].trim();
        } else if (typeof obj[prop] === 'object') {
          traverse(obj[prop]);
        }
      }
    };
  
    traverse(req.body);
    next();
};
  