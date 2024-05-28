process.env.NODE_ENV = 'testing'
process.env.PORT=0
process.env.JWT_SECRET = 'testPrivateKey';
process.env.JWT_EXPIRES_IN = '24h'
process.env.DB_URL = 'mongodb://localhost/geovehicles_test:<PASSWORD>'