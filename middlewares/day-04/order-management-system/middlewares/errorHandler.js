export const errorHandler = (err, req, res, next) => {
    console.error("[GLOBAL ERROR]", err);

    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.stack,
    });
};