const request = require('supertest');
const app = require('../../../bootstrap/app');
const { Vehicle } = require('../../../app/models/vehicle');
const { 
    createFakeAdminPayload,
    generateFakeTokenFrom,
    generateRandomId
} = require('../../../utils/tests/helpers');

describe('route: /api/vehicles', () => {
    const endpoint = '/api/vehicles/';

    afterAll(async () => {
        await Vehicle.deleteMany();
    });

    let token;
    let payload;

    beforeEach(() => {
        token = generateFakeTokenFrom(createFakeAdminPayload());
        payload = {
            make: "Test make",
            model: "Test model",
            vin: "12345678901234567",
            year: "2024",
            type: "car",
            eco: "Euro 06",
            gearbox: "auto",
            fuel: "diesel",
            seats: 5,
            extras: ["_21313123", "_34535465456"]
        }
    });

    const post = async () => {
        return await request(app)
            .post(endpoint)
            .set('x-auth-token', token)
            .send(payload)
    }

    describe('CREATE', () => {
        it('Should return 400 if request is not valid', async () => {
            payload.vin = '';
            const res = await post();
            expect(res.status).toBe(400);
        });

        it('Should return 400 if VIN already exists', async () => {
            payload.vin = '79956612921503406'
            const vehicle = new Vehicle(payload);
            await vehicle.save();

            const res = await post();
            expect(res.status).toBe(400);
        });

        it('Should return 201 if the vehicle is created', async () => {
            const res = await post();
            const vehicle = await Vehicle.findOne({ vin: payload.vin });
            expect(vehicle).not.toBeNull();
            expect(vehicle.vin).toEqual(payload.vin);
            expect(res.status).toBe(201);
        });
    });

    const update = async (id) => {
        return await request(app)
            .put(endpoint + id)
            .set('x-auth-token', token)
            .send(payload)
    }

    describe('UPDATE', () => {
        describe('/api/vehicle/:id', () => {
            it('Should return 400 for invalid vehicle id', async () => {
                payload = {};
                const res = await update(1);
                expect(res.status).toBe(400);
            });

            it('Should return 404 if vehicle not found in the database', async () => {
                payload = {};
                const res = await update(generateRandomId());
                expect(res.status).toBe(404);
            });

            it('Should return 400 if vehicle already exist', async () => {
                payload.vin = '07895721286783969';

                const vehicle = new Vehicle(payload);
                await vehicle.save();

                const res = await update(vehicle._id);
                expect(res.status).toBe(400);
            });

            it('Should return 400 if req.body is invalid', async () => {
                const vehicle = await Vehicle.findOne({ vin: payload.vin });
                delete payload.vin;
                payload.type = 'any';

                const res = await update(vehicle._id);
                expect(res.status).toBe(400);
            });

            it('Should return 200 if vehicle is updated', async () => {
                const vehicle = await Vehicle.findOne({ vin: payload.vin });
                delete payload.vin;
                payload.type = 'bus';

                const res = await update(vehicle._id);
                expect(res.status).toBe(200);
            });
        });
    })
});