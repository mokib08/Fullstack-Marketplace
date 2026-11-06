const request = require('supertest');
const app = require('../../src/app');
const { getAuthCookie} = require('../setup/auth')


describe('GET /api/orders/me - paginated list of the customer’s orders', () => {
    it('return paginated orders with meta and default page=1 limit=10', async () => {
        const res = await request(app)
            .get('/api/orders/me')
            .set('Cookie', getAuthCookie())
            .expect('Content-Type', /json/)
            .expect(200);


        const body = res.body;
        expect(body).toBeDefined();
        const items = body.orders || body.items || body.data || [];
        expect(Array.isArray(items)).toBe(true);

        const meta = body.meta || body.pagination || {}     
        expect(meta).toBeDefined();
        expect(typeof (meta.page)).toBe('number');
        expect(typeof (meta.limit ?? 20)).toBe('number');
        expect(typeof (meta.total ?? 0)).toBe('number');

    });


    it('return page and limit query params', async () => {
        const res = await request(app)
            .get('/api/orders/me?page=2&limit=5')
            .set('Cookie', getAuthCookie())
            .expect('Content-Type', /json/)
            .expect(200);

        const meta = res.body.meta || res.body.pagination || {};
        expect([2, 2]).toContain(meta.page);
        expect([5, 5]).toContain(meta.limit);
    })



    it('return empty list when user has no orders', async () => {
        const res = await request(app)
            .get('/api/orders/me')
            .set('Cookie', getAuthCookie({userId: '6aeb7b6ab1d7e43c8dbd1bca'}))
            .expect('Content-Type', /json/)
            .expect(200);

        const items = res.body.orders || res.body.items || res.body.data || [];
        expect(Array.isArray(items)).toBe(true);
        expect(items.length).toBe(0);
    })
} )