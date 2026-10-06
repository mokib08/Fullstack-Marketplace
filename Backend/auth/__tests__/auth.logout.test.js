const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const userModel = require('../src/models/user.model');





describe('GET /api/auth/logout', () => {

    it('clears the auth cookie and returns 200 when logged in ', async () => {
        const password = 'Secret123!';
        const hash = await bcrypt.hash(password, 10);
        await userModel.create({
            username: 'logout_user',
            email: 'logout@example.com',
            password: hash,
            fullName: {firstName: "Log", lastName: 'Out'},
        });

        const loginRes = await request(app)
                .post('/api/auth/login')
                .send({email: 'logout@example.com', password});

        expect(loginRes.status).toBe(200);
        const cookies = loginRes.headers[ 'set-cookie' ];
        expect(cookies).toBeDefined();

        const res = await request(app)
                .get('/api/auth/logout')
                .set('Cookie', cookies);

        expect(res.status).toBe(200);
        const setCookie = res.headers[ 'set-cookie' ] || [];
        const cookieStr = setCookie.join(';');
        // token cookie cleard (empty value) and expired
        expect(cookieStr).toMatch(/token=;/);
        expect(cookieStr.toLowerCase()).toMatch(/expires=/);

    });

    it('is idempotent: returns 200 even without auth cookie', async () => {
        const res = await request(app).get('/api/auth/logout');
        expect(res.status).toBe(200);
    })
})