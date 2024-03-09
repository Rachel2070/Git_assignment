const { createUser } = require('../controllers/user.controller');
const userService = require('../data/service');

jest.mock('../data/service', () => ({
    createUser: jest.fn()
}));

describe('Cerate user function', () => {
    it('should handle creating new user', async () => {
        const req = { body: { id: 777, fullName: 'Jhon Brice', email: 'Jhon@example', tel: '052538164' } }
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
        userService.createUser.mockResolvedValue(req.body);

        await createUser(req, res);

        expect(userService.createUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(`user created ${req.body}`);
    });

    it('should handle errors while creating new user', async () => {
        const req = { body: { id: 777, fullName: 'Jhon Brice', email: 'Jhon@example', tel: '052538164' } }
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
        const errorMessage = 'Internal Server Error';
        userService.createUser.mockRejectedValue(new Error(errorMessage));

        userService.createUser.mockRejectedValue(req.body);

        await createUser(req, res);

        expect(userService.createUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Internal Server Error`);

    });

})