const request = require('supertest')
const app = require('../app')
const utils = require('./utils')
const mongoose = require('mongoose')
const { validateLoginBody } = require('../middleware/user')

jest.mock('supertest'); // Mocking for a module import

describe("user",  () => {

  beforeAll(async () => {    
    await mongoose.connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true })
  })  
  
  const mockReq = () => {
    const req = {};
    req.body = {};   
    return req;
  };

  const mockRes = () => {
    const res = {};
    // res.status = null
    // res.json = {}
    res.status = jest.fn();
    res.json = jest.fn();
    return res;
  };

  test("middleware test",async () => {
    
    const mockedNext = jest.fn();
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    const mockedEntries = {
      "success": false,
      "error": {
        "code": 4000,
        "message": "Validation error: \"email\" is required, \"password\" is required"
      }
    };

    const result = validateLoginBody(mockedReq,mockedRes,mockedNext)
    expect(result.status).toHaveBeenCalledWith(400)
    expect(result.json).toBeCalledWith(mockedEntries);  
  })

  test("It should response encrypted password", async () => {
    const res = await utils.hashPassword('123456');
    expect(res).toBe('e10adc3949ba59abbe56e057f20f883e');        
  });

  test("It should response the POST method Register", async () => {
    const body = {
      "email":"abhi123123@gmail.com",
      "password":"123456",
      "username" :"abhishek"
    };

    const response = await request(app).post("/users/register").send(body)
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success')
    expect(response.body['success']).toBe('true')    
  });

  test("It should response the POST method Login", async () => {
    const body = {
      "email":"abcerd@gmail.com",
      "password":"123456"
    };

    const response = await request(app).post("/users/login").send(body)          
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user')
    const user = response.body.user
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('email')
  });

})