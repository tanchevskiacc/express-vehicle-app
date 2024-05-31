const mongoDB = require('../database/mongodb');

beforeAll(() => { mongoDB.connect() });
afterAll(() => { mongoDB.disconnect() });
afterEach(async () => {
    // const collections = mongoDB.mongoose.connection.collections;
    // try {
    //     for (const key in collections) {
    //         const collection = collections[key];
    //         await collection.deleteMany({});
    //     }
    // } catch (e) {
    //     console.error(e);
    // }
});
