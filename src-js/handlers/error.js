function HttpException (status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

/*
export const responseError = (res: Response, error: Error) => {
    // tslint:disable-next-line
    console.error(error);
    const httpException = error as HttpException;
    return res
        .status(httpException.status)
        .json({ error: httpException.message });
}

export const error403 = (req: express.Request, res: any, next: express.NextFunction) => next(
    new HttpException(403, 'Forbidden')
);

export const error404 = (req: express.Request, res: any, next: express.NextFunction) => next(
    new HttpException(404, 'Not Found')
);

*/

function error404 (req, res, next) {
  return next(HttpException(404, 'Not Found'));
}

/*
export const error500 = (req: express.Request, res: any, next: express.NextFunction) => next(
    new HttpException(500, 'Server Error')
);
*/

function logError (err, req, res, next) {
  console.error(err);
  next(err);
}

function defaultError (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const env = req.app.get('env');
  const error = env === 'development'
    ? err
    : undefined;
  const {
    status,
    message,
  } = err;

  return res
    .status(status || 500)
    .json({
      message,  
      error,
    });
}

module.exports = {
  defaultError,
  logError,
  error404,
};
