process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://localhost:27017/test-db-skip-real';
process.env.JWT_SECRET = process.env.JWT_SECRET || '71828b65efc09a07c3668db613cb65dc0cb9bdc8b010958fe9fe9245580daf27' ;
process.env.JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'token';

