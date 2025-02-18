import RequestUtil from '../utils/requestUtils.js';

const validateFile = (req, res, next) => {

  if (!req.file) {

    return res.status(400).json(
      RequestUtil.prepareResponse(
        'FAIL',
        `You must upload a file`,
        {},
      )
    );

  }

  next();

};

export default validateFile;