import express from 'express';

export class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const error403 = (req: express.Request, res: any, next: express.NextFunction) => next(
    new HttpException(403, 'Forbidden')
);

export const error404 = (req: express.Request, res: any, next: express.NextFunction) => next(
    new HttpException(404, 'Not Found')
);

export const error500 = (req: express.Request, res: any, next: express.NextFunction) => next(
    new HttpException(500, 'Server Error')
);

export default (err: HttpException, req: express.Request, res: express.Response) => res
    .status(err.status || 500)
    .json({
        message: err.message,
        error: (req.app.get('env') === 'development')
            ? err
            : undefined,
    });
