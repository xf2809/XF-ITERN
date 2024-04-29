const dotenv = require("dotenv");
dotenv.config({path: "e2e/config.env"});
const mongoose = require("mongoose");
const request = require('supertest');
let app;

beforeAll(async () => {
    app = require("../../app");
    const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
    mongoose.connect(DB).then(()=>{
    console.log("Connected to database Test");
});
  });
afterAll(async () => {
    // await User.deleteMany({});
    await mongoose.connection.close();
  });

describe('user all endpoints', () => {
    // -> /api/v1/get-user
    test('/get-user - Not Logined', async () => {
        const response = await request(app).get('/api/v1/get-user');
        console.log(response.text);
        const textMessage = JSON.parse(response.text);
        expect(response.statusCode).toBe(404);
        expect(textMessage.status).toBe('Failed');
        expect(textMessage.err).toBe('OOPs, Firstly you have to logined in !!');
       
    });
    test('/login', async () =>{
        const response = await request(app).post('/api/v1/login').send({
            email:'demo@xf.intern'
        });
        const textMessage = JSON.parse(response.text);
        console.log(textMessage);
        expect(response.statusCode).toBe(200);
        expect(textMessage.status).toBe('Successfully Send OTP');

        // const response1 = await request(app).post('/api/v1/verify').send({
        //     otp:'12345'
        // });
        // expect(response.statusCode).toBe(200);
        // expect(textMessage.err).toBe('OOPs, Firstly you have to logined in !!');
    });
})