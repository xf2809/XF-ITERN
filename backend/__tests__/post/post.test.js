const postController = require("../../controller/adminPostController");
const httpMocks = require('node-mocks-http');
// mocking the userModel
jest.mock('../../model/adminPostModel.js');
jest.mock('../../controller/adminPostController');

describe('user testing', () => {
  test('Create a Post', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const data = {
      "type": "internship-onsite",
      "salary": 4500,
      "duration": 3,
      "start": {
        "$date": "2024-05-17T00:00:00.000Z"
      },
      "deadline": {
        "$date": "2024-04-20T00:00:00.000Z"
      },
      "companyName": "xf",
      "description": "Exp: 1 to 3 years \n\nSal: As per Industry Standard\n\nQualification: B.E/B.Tech/M.E/M.Tech/BCA/MCA/B.Sc/M.Sc",
      "name": "Java Developer"
    }
    const mockValue = {
      status: "Success",
      statusCode: 200,
      ...data
    }
    const mockFindById = jest.spyOn(postController,'createPost').mockImplementation(() => {
      return {
      "_id": '660e3a0cfde07df5ddbcba2f',
      "pid": "660d6263bbd0df8300fbe4ed",
      "logo": "https://internshala.com/static/images/company/logo.svg",
      "companyId": "a9dec7c3-a10e-4963-976a-1bb39d8de7c2",
      "__v": 0,
      "status": "pending",
      ...mockValue
    };
    });

    const response = await postController.createPost(req,res);
    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(response.name).toBe(mockValue.name);
    expect(response.statusCode).toEqual(200);
    expect(response.status).toBe("Success");

  });
  test('viewPost', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const data = {
      "_id": '660e3a0cfde07df5ddbcba2f',
      "pid": "660d6263bbd0df8300fbe4ed",
      "type": "internship-onsite",
      "companyId": "a9dec7c3-a10e-4963-976a-1bb39d8de7c2",
      "salary": 4500,
      "duration": 3,
      "start": {
        "$date": "2024-05-17T00:00:00.000Z"
      },
      "deadline": {
        "$date": "2024-04-20T00:00:00.000Z"
      },
      "companyName": "xf",
      "description": "Exp: 1 to 3 years \n\nSal: As per Industry Standard\n\nQualification: B.E/B.Tech/M.E/M.Tech/BCA/MCA/B.Sc/M.Sc",
      "status": "selected",
      "userId": {
        "$oid": "660e37acfde07df5ddbcba19"
      },
      "logo": "https://internshala.com/static/images/company/logo.svg",
      "__v": 0,
      "name": "Java Developer"
    }
    const mockValue = {
      status: "Success",
      statusCode: 200,
      post: data
    }
    
    const mockFindById = jest.spyOn(postController,'viewPost').mockImplementation(() => {
      return mockValue;
    });
    const response = await postController.viewPost(req,res);

    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(response).toBe(mockValue);
    expect(response.statusCode).toEqual(200);
    expect(response.post._id).toEqual('660e3a0cfde07df5ddbcba2f');

  });
  test('Update a Post', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    // const data = {
    //   "type": "internship-remote",
    // }
    const mockValue = {
      status: "Success",
      statusCode: 200,
      output:"Post updated successfully"
    }
    const mockUpdatePost = jest.spyOn(postController,'updatePost').mockImplementation(() => {
      return  mockValue;
    });

    const response = await postController.updatePost(req,res);
    expect(mockUpdatePost).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response.status).toBe("Success");
    expect(res.statusCode).toEqual(200);
    // const changeStatus= {
    //   "status":"selected"
    // }
    const changeMockValue = {
      status: "Success",
      statusCode: 200,
      message:`Status change from pending to selectd`
    }
    const mockStateChange = jest.spyOn(postController,'statusChange').mockImplementation(() => {
      return  changeMockValue;
    });
    await postController.statusChange(req,res);
    expect(mockStateChange).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);


  });
  test('deletePost',async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    // const data = {
    //   "_id": '660e3a0cfde07df5ddbcba2f',
    //   "pid": "660d6263bbd0df8300fbe4ed",
    //   "type": "internship-onsite",
    //   "companyId": "a9dec7c3-a10e-4963-976a-1bb39d8de7c2",
    //   "salary": 4500,
    //   "duration": 3,
    //   "start": {
    //     "$date": "2024-05-17T00:00:00.000Z"
    //   },
    //   "deadline": {
    //     "$date": "2024-04-20T00:00:00.000Z"
    //   },
    //   "companyName": "xf",
    //   "description": "Exp: 1 to 3 years \n\nSal: As per Industry Standard\n\nQualification: B.E/B.Tech/M.E/M.Tech/BCA/MCA/B.Sc/M.Sc",
    //   "status": "selected",
    //   "userId": {
    //     "$oid": "660e37acfde07df5ddbcba19"
    //   },
    //   "logo": "https://internshala.com/static/images/company/logo.svg",
    //   "__v": 0,
    //   "name": "Java Developer"
    // }
    const mockValue = {
      status: "Success",
      statusCode:200,
      output:"post deleted successuly"
    }
    
    const mockDeleteById = jest.spyOn(postController,'deletePost').mockImplementation(() => {
      return mockValue;
    });
    const response = await postController.deletePost(req,res);

    expect(mockDeleteById).toHaveBeenCalledTimes(1);
    expect(response).toBe(mockValue);
    expect(response.statusCode).toEqual(200);
    expect(response.output).toBe("post deleted successuly");

    const mockFailedValue = {
      status:"failed",
      statusCode:400,
      err:'CastError: Cast to ObjectId failed for value "660e3a0cfde07df5ddbcba2f" (type string) at path "_id" for model "Adminpost"'
    }

    const mockFindById = jest.spyOn(postController,'deletePost').mockImplementation(() => {
      return mockFailedValue;
    });
    const responseX = await postController.deletePost(req,res);
    expect(mockDeleteById).toHaveBeenCalledTimes(2);
    expect(mockFindById).toHaveBeenCalledTimes(2);
    expect(responseX.statusCode).toEqual(400);
    expect(responseX.status).toEqual("failed");
    expect(responseX.err).toBe(mockFailedValue.err);

  })
  test('check viewAllPost route', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const data = [{
      "_id": {
        "$oid": "660e3a0cfde07df5ddbcba2f"
      },
      "pid": "660d6263bbd0df8300fbe4ed",
      "type": "internship-onsite",
      "companyId": "a9dec7c3-a10e-4963-976a-1bb39d8de7c2",
      "salary": 4500,
      "duration": 3,
      "start": {
        "$date": "2024-05-17T00:00:00.000Z"
      },
      "deadline": {
        "$date": "2024-04-20T00:00:00.000Z"
      },
      "companyName": "xf",
      "description": "Exp: 1 to 3 years \n\nSal: As per Industry Standard\n\nQualification: B.E/B.Tech/M.E/M.Tech/BCA/MCA/B.Sc/M.Sc",
      "status": "selected",
      "userId": {
        "$oid": "660e37acfde07df5ddbcba19"
      },
      "logo": "https://internshala.com/static/images/company/logo.svg",
      "__v": 0,
      "name": "Java Developer"
    },
    {
      "_id": {
        "$oid": "660e3c59a4336f0482c6b942"
      },
      "pid": "660d6263bbd0df8300fbe4ed",
      "type": "internship-onsite",
      "companyId": "a9dec7c3-a10e-4963-976a-1bb39d8de7c2",
      "salary": 4500,
      "duration": 3,
      "start": {
        "$date": "2024-05-17T00:00:00.000Z"
      },
      "deadline": {
        "$date": "2024-04-20T00:00:00.000Z"
      },
      "companyName": "xf",
      "description": "Exp: 1 to 3 years \n\nSal: As per Industry Standard\n\nQualification: B.E/B.Tech/M.E/M.Tech/BCA/MCA/B.Sc/M.Sc",
      "status": "notselected",
      "userId": {
        "$oid": "660aa76047ccaf9154284029"
      },
      "logo": "https://internshala.com/static/images/company/logo.svg",
      "__v": 0,
      "name": "Java Developer"
    }];

    const Mockresponse = {
      status: "Success",
      statusCode: 200,
      post: data
    }
    const mockController = jest.spyOn(postController, 'viewAllPost').mockImplementation(() => {
      return Mockresponse;
    });
    const response = await postController.viewAllPost(req, res);
    expect(mockController).toHaveBeenCalledTimes(1);
    expect(response).toBe(Mockresponse);
    expect(response.statusCode).toEqual(200);
    expect(response.post.length).toBe(2);
    expect(res.statusCode).toEqual(200);
  });
});
