const userService=require('../data/service');
const {getUserById}=require('../controllers/user.controller')

jest.mock('../data/service',()=>({
    getUserById:jest.fn(),
}));

describe('getUserById',()=>{
    it('get user by id successfully and returns 200 status',async()=>{
        const userId=1
        const user={
            id:userId,
            fullName:'userTest',
            email:'userTest@gmail.com',
            tel:'0525577557'
        }
        const req={params: { id: userId }}
        const res={status: jest.fn().mockReturnThis(), send: jest.fn()}

        userService.getUserById.mockResolvedValueOnce(user)

        await getUserById(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(user)
    })
    it('handle user get by id not found and returns 404 status',async()=>{
        const userId=1
        const req={params: { id: userId }}
        const res={status: jest.fn().mockReturnThis(), send: jest.fn()}

        userService.getUserById.mockResolvedValueOnce(null)

        await getUserById(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.send).toHaveBeenCalledWith('user not found')
    })
    it('could not get this user and returns 400 status',async()=>{
        const userId=1
        const req={params: { id: userId }}
        const res={status: jest.fn().mockReturnThis(), send: jest.fn()}

        userService.getUserById.mockRejectedValueOnce('some error');

        await getUserById(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('some error')
    })
})
