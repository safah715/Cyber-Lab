const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const securityMiddleware = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://www.gstatic.com", "https://www.google.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
                imgSrc: ["'self'", "data:", "https:", "http:"],
                connectSrc: ["'self'", "https://cyber-lap.firebaseapp.com", "https://firestore.googleapis.com"]
            }
        },
        crossOriginEmbedderPolicy: false
    }));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, 
        max: 100, 
        message: { error: "تم تجاوز حد المحاولات المسموح بها. يرجى المحاولة لاحقاً." }
    });
    app.use('/api/', limiter);
};

module.exports = securityMiddleware;