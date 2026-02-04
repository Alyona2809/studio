function formatResponse(statusCode, message, data = null, error = null) {
  if (typeof statusCode === "object" && statusCode !== null) {
    const opts = statusCode;
    return {
      statusCode: opts.statusCode,
      message: opts.message,
      data: opts.data ?? null,
      error: opts.error ?? null,
    };
  }
  return {
    statusCode,
    message,
    data,
    error,
  };
}

module.exports = formatResponse;
