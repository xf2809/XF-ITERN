const userController = require("../../controller/userController");
const httpMocks = require('node-mocks-http');
// mocking the userModel
jest.mock('../../model/userModel');
jest.mock('../../controller/userController');

describe('user testing', () => {
    test('verify/Login', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        req.body.email = "shreyaSharma2809xf@xf.tech"
        const mockLogin = jest.spyOn(userController,'login').mockImplementation(() => {
            return {
                status:"Successfully Send OTP"
            };
        });
        const loginResponse = userController.login(req,res);

        expect(mockLogin).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toEqual(200);
        expect(loginResponse.status).toBe("Successfully Send OTP");

        req.body.otp = 10123;
        // you will get otp on your email (shreyaSharma2809xf@xf.tec)
        const Mockresponse = {
            "status": "Successfully Login in",
            "user": {
                "_id": "660aa76047ccaf9154284029",
                "email": "shreyaSharma2809xf@xf.tech",
                "name": "Shreya Sharma",
                "college_name": "IIT Gorakhpur",
                "year": 2026,
                "degree": "B.Tech in Computer Science",
                "linkedin": "www.linkedin.com/raj_sharma_no_account",
                "github": "www.github.com/raj_sharma_no_account",
                "applied": [],
                "role": "user",
                "bookmark": []
        }};
        const mockController = jest.spyOn(userController,'verify').mockImplementation(() => {
            return Mockresponse;
        });
        const response = userController.verify(req,res);
        expect(mockController).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toEqual(200);
        expect(response.status).toBe("Successfully Login in");
    });
    test('verify/Register', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const data = {
                "email": "mmmut2809@gmail.com",
                "name": "Raj Sharma",
                "college_name": "IIT Gorakhpur",
                "year": 2026,
                "degree": "B.Tech in Computer Science",
                "linkedin": "www.linkedin.com/raj_sharma_no_account",
                "github": "www.github.com/raj_sharma_no_account",
              }
        req.body = data;
        const mockLogin = jest.spyOn(userController,'register').mockImplementation(() => {
            return {
                status:"Successfully Send OTP"
            };
        });
        const loginResponse = userController.register(req,res);

        expect(mockLogin).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toEqual(200);
        expect(loginResponse.status).toBe("Successfully Send OTP");

        req.body.otp = 10123;
        // you will get otp on your email (shreyaSharma2809xf@xf.tec)
        const Mockresponse = {
            "user": {
                "_id":"66166f8857a8b5d11bd61798",
                "applied":[],
                "bookmark":[],
                data
            }
        };
        const mockController = jest.spyOn(userController,'verify').mockImplementationOnce(() => {
            return Mockresponse;
        });
        mockController.mockReset();
        // const response = userController.verify(req,res);
        expect(mockController).toHaveBeenCalledTimes(1); 
        expect(res.statusCode).toEqual(200);
    });
    test('getUserById', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const data = {
            "email": "shreyaSharma2809xf@xf.tec",
            "name": "Shreya Sharma",
            "college_name": "IIT Gorakhpur",
            "year": 2026,
            "degree": "B.Tech in Computer Science",
            "linkedin": "www.linkedin.com/raj_sharma_no_account",
            "github": "www.github.com/raj_sharma_no_account",
          }
        const Mockresponse = {
            status:"Success",
            statusCode:200,
            status:"Successfully OTP Send",
            ...data
        }
        const mockController = jest.spyOn(userController,'getUserById').mockImplementation(() => {
            return {
                
                    "$id": "66166f8857a8b5d11bd61798",
                    "__v": 0,
                    "role": "user",
                    "applied":[],
                ...Mockresponse};
        });
        const response = userController.getUserById(req,res);
        // await register(req, res);
        expect(mockController).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(res.statusCode).toEqual(200);
    });
    test('Logout', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const Mockresponse = {
            status:"Success",
            statusCode:200,
            message : "Logout successfully"
        }
        const mockController = jest.spyOn(userController,'logout').mockImplementation(() => {
            return Mockresponse;
        });
        const response = userController.logout(req,res);
        expect(mockController).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(res.statusCode).toEqual(200);
        expect(response.message).toBe("Logout successfully");
    });
})
