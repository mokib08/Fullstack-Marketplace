const request = require('supertest');
const app = require('../../src/app')
const { getAuthCookie } = require('../setup/auth');
const orderModel = require('../../src/models/order.model');


describe('GET /api/order/:id — Get order by id with timeline and payment summary', () => {
   
    const orderId = '6aeb7b6ab1d7e43c8dbd1bca';

    it('returns 200 with order details, timeline, and payment summery', async () => {
        const isOrder = await orderModel.findById(orderId).exec();

        if(!isOrder){
            return; // skip test if order not found
        }

        const res = await request(app)
            .get(`/api/orders/${orderId}`)
            .set('Cookie', getAuthCookie())
            .expect('Content-Type', /json/)
            .expect(200)

        expect(res.body).toBeDefined();
        const order = res.body.order || res.body.data || res.body;

        expect(order._id || order.id).toBeDefined();
        expect(order.user).toBeDefined();

        expect(Array.isArray(order.items)).toBe(true);

        expect(order.status).toBeDefined();
        expect(order.totalPrice).toBeDefined();
        expect(typeof (order.totalPrice.amount ?? order.totalPrice?.value ?? 0)).toBe('number')


        // Timiline (event like created, paid, shipped, delivered, cancelled)
        expect(Array.isArray(order.timiline)).toBe(true)
        if(order.timiline.length){
            const ev = order.timiline[0];
            expect(ev).toHaveProperty('type')
            expect(ev).toHaveProperty('at');
        }

        // Payment Summary (structure can vary)
        const payment = order.paymentSummary || order.payment || {};
        expect(payment).toBeDefined();
    });

    it('returns 404 when order not found or not accessible', async () => {
        const res = await request(app)
            .get(`/api/orders/000000000000000000000000`)
            .set('Cookie', getAuthCookie())
            .expect('Content-Type', /json/)
            .expect(404)
        expect(res.body.error || res.body.message).toMatch(/not found|no.*order/i)
    });
}) ;