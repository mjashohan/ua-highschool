module.exports = {
    port:process.env.PORT || 5000,
    db: {
        database: process.env.DB_NAME || 'ua-highschool',
        host: process.env.HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '1234567',
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}