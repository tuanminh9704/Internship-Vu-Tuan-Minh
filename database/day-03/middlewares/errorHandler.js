export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const error = err.name || 'InternalServerError';
    const message = err.message || 'Something went wrong';
  
    console.error(`[ERROR] ${status} - ${message} - ${req.method} ${req.url}`);
  
    res.status(status).json({
      status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    });
};

  