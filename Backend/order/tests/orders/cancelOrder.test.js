const request = require('supertest');
const app = require('../../src/app')
const { getAuthCookie } = require('../setup/auth');
const orderModel = require('../../src/models/order.model');



describe('POST /api/orders/:id/cancel — Buyer-initiated cancel while rules apply', () => {
    const orderId = '6aeb7b6ab1d7e43c8dbd1bca';

    beforeEach(async () => {
        await orderModel.deleteMany({});
    });

    it('cancels a PENDING order and returns updated order', async () => {
        const order = new orderModel({
            _id: orderId,
            user: '6ad1c295af9d458d722b5eae',
            status: 'PENDING',
            items: [
                {
                    product: '6acda5cfe1fa4c5d19da7cd8',
                    quantity: 1,
                    price: {amount: 100, currency: 'USD'},
                },
            ],
            totalPrice: {amount: 100, currency: 'USD'},
            shippingAddress: {
                street: '123 Main St',
                city: 'Metropolis',
                state: 'CA',
                zip: '90210',
                country: 'USA'
            },
        });

        await order.save()

        const res = await request(app)
            .post(`/api/orders/${orderId}/cancel`)
            .set('Cookie', getAuthCookie())
            .expect('Content-Type', /json/)
            .expect(200)

        const orderResponse = res.body.order || res.body.data || res.body
        expect(orderResponse.status).toMatch(/CANCELLED|CANCELED/i);

    });

    it('returns 409 when order is not cancellable (e.g., SHIPPED or DELIVERED', async () => {
        const order = new orderModel({
            _id: orderId,
            user: '6ad1c295af9d458d722b5eae',
            status: 'SHIPPED',
            items: [
                {
                    product: '6acda5cfe1fa4c5d19da7cd8',
                    quantity: 1,
                    price: {amount: 100, currency: 'USD'}
                },
            ],
            totalPrice: { amount: 100, currency: 'USD' },
            shippingAddress: {
                street: '123 Main St',
                city: 'Metropolis',
                state: 'CA',
                zip: '90210',
                country: 'USA'
            },
        });
        await order.save();

        const res = await request(app)
            .post(`/api/orders/${orderId}/cancel`)
            .set('Cookie', getAuthCookie())
            .expect('Content-Type', /json/)
            .expect(409)

        expect(res.body.error || res.body.message).toMatch(/cannot|not.*cancell/i);
    });

    it('returns 403 when user is not the owner of the order', async () => {
        const order = new orderModel({
            _id: orderId,
            user: '6ad1c295af9d458d722b5eae',
            items: [],
            status: 'PENDING',
            totalPrice: {
                amount: 0,
                currency: 'USD'
            },
            shippingAddress: {
                street: '123 Main St',
                city: 'Metropolise',
                state: 'NY',
                zip: '10001',
                country: 'USD'
            }
        });

        await order.save()

        const res = await request(app)
            .post(`/api/orders/${orderId}/cancel`)
            .set('Cookie', getAuthCookie({userId: '6aeb7b6ab1d7e43c8dbd1bca'}))
            .expect('Content-Type', /json/)
            .expect(403);

        expect(res.body.error || res.body.message).toMatch(/forbidden|not.*allowed/i)

    });
});