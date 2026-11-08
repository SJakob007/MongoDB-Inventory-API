// Runs every time the server receives a request
export function logger(req, res, next)
{
    // Creates timestamp
    const timestamp = new Date().toISOString();

    // Identifies request method (GET,POST,PUT,DELETE)
    // and requested file endpoint (/api/resources/...)
    console.log(`${timestamp}] ${req.method} ${req.path}`);

    // Request continues to next middleware / route handler
    next();
}