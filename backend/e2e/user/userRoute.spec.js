const dotenv = require("dotenv");
dotenv.config({path: "e2e/config.env"});
const mongoose = require("mongoose");
const request = require('supertest');
const User = require("../../model/userModel");
let app;
let cookies;

beforeAll(async () => {
    app = require("../../app");
    const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
    mongoose.connect(DB).then(()=>{
    console.log("Connected to database Test");
});
  });
afterAll(async () => {
    await User.deleteOne({email:'demo@xf.intern'})
    await mongoose.connection.close();
  });

describe('user all endpoints', () => {
    // -> /api/v1/get-user
    //  // get-user ===> Failed
    test('/get-user - Not Logined', async () => {
        // app.use(userController.isAuthe)
        const response = await request(app).get('/api/v1/get-user');
        // console.log(response.text);
        const textMessage = JSON.parse(response.text);
        expect(response.statusCode).toBe(404);
        expect(textMessage.status).toBe('Failed');
        expect(textMessage.err).toBe('OOPs, Firstly you have to logined in !!');     
    });
    test('/register', async () => {
        const data = {
        email: 'demo@xf.intern',
        name: 'Xf User Demo',
        mobile: 2809100428,
        college_name: 'IIT New York',
        year: 2032,
        degree: 'B.Tech in Computer Science',
        linkedin: 'https://www.linkedin.com/in/rahul-vishwakarma-553874256/',
        github: 'https://github.com/manzil-infinity180',
        resume: 'https://shorturl.at/quKVW',
        }
        const response = await request(app).post('/api/v1/register').send(data);
        console.log(response.text);

        const response1 = await request(app).post('/api/v1/verify').send({
            otp:'12345'
        });
           
        // app.use(adminController.isAuthenticated);
        expect(response1.statusCode).toBe(200);
        cookies = response1.header['set-cookie'][0].split(',').map(item => item.split(';')[0]);
        cookies = cookies.join(';');
        console.log(cookies);

    })
    test('/login', async () =>{
        const response = await request(app).post('/api/v1/login').send({
            email:'demo@xf.intern'
        });
        const textMessage = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(textMessage.status).toBe('Successfully Send OTP');
        
        const response1 = await request(app).post('/api/v1/verify').send({
            otp:'12345'
        });
           
        // app.use(adminController.isAuthenticated);

        cookies = response1.header['set-cookie'][0].split(',').map(item => item.split(';')[0]);
        cookies = cookies.join(';');
        console.log(cookies);
        
        // get-user ===> SUCCESS
        const response2 = await request(app).get('/api/v1/get-user').set(
            'Cookie',cookies
        );
        const verifiedText = JSON.parse(response2.text);
        expect(response2.statusCode).toBe(200);
        expect(verifiedText.status).toBe('Success');
    });
    test('Add Bookmark and Expand its content', async () => {
        // 661c20e19f3b080c281c88f3
        const response = await request(app).post('/api/v1/add/bookmark').send({
            bookmark_id : '661c20e19f3b080c281c88f3'
        }).set(
            'Cookie',cookies
        );
        const responseText = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(responseText.message).toBe('Bookmark successfully');

        // expand its content
        const response1 = await request(app).get('/api/v1/bookmark').set(
            'Cookie',cookies
        );
        expect(response1.statusCode).toBe(200);
    });
    test('Apply to role ', async () => {
        const data = {
            _id:'662817e83b6cacfd6ad1269f',
            type: "internship-remote",
            name: "DevOps Engineer AWS/Google Cloud",
            adminId: "a9dec7c3-a10e-4963-976a-1bb39d8de7c2",
            start: "2024-05-10",
            deadline: "2024-04-25",
            companyName: "xf",
            salary: 12500,
            duration: 5,
            website:'https://xfintern.onrender.com/',
            description: "Job Description:\n• 2+ years of experience working with AWS Cloud.\n• Build, configure, and manage cloud compute and data storage infrastructure for multiple instances of AWS and Google Cloud Platform.\n• Manage VPCs, security groups, and user access to our various public cloud systems and services.\n• Develop processes and procedures for using cloud-based infrastructures, including, access key rotation, disaster recovery, and building new services.",
            skills: "AWS, Google Cloud, CI/CD"
        };
        const response = await request(app).post('/api/v1/applied').send(data).set(
            'Cookie',cookies
        );
        expect(response.statusCode).toBe(200);
    });
    test('/logout', async () => {
        const response = await request(app).get('/api/v1/logout').set(
            'Cookie',cookies
        );
        const responseText = JSON.parse(response.text);
        console.log(responseText);
        expect(response.statusCode).toBe(200);
        expect(responseText.message).toBe('Logout successfully');
    });
})