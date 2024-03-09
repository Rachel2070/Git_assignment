const userService = require('../data/service')
const {deleteUser} = require('../controllers/user.controller')

jest.mock('../data/service', () => ({
    deleteUser: jest.fn(),
}))

describe('deleteUser',()=>{
    it('delete user successfully and returns 200 status', async () => {
        const userId = 1
        const req = { params: { id: userId } }
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    
        userService.deleteUser.mockResolvedValueOnce({ id: userId })
    
        await deleteUser(req, res)
    
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith('user was deleted')
    });

    it('handle user not found and returns 404 status', async () => {
        const userId = 1
        const req = { params: { id: userId } }
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    
        userService.deleteUser.mockResolvedValueOnce(null)
    
        await deleteUser(req, res)
    
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.send).toHaveBeenCalledWith('user not found')
    });
})

