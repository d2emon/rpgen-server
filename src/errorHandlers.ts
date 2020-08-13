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

export const error404 = (req: express.Request, res: any, next: express.NextFunction) => next(
    new HttpException(404, 'Not Found')
);

export default (err: HttpException, req: express.Request, res: express.Response) => res
    .status(err.status || 500)
    .json({
        message: err.message,
        error: (req.app.get('env') === 'development')
            ? err
            : undefined,
    });
