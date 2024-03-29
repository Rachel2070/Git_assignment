const { updateUser } = require('../controllers/user.controller');
const userService = require('../data/service');

jest.mock('../data/service', () => ({
    updateUser: jest.fn()
}));

describe('Update user function', () => {
    it('should handle updating user', async () => {
        const req = { params: { id: 1 }, body: { fullName: 'Updated Name' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        userService.updateUser.mockResolvedValue(req.body);

        await updateUser(req, res)

        expect(userService.updateUser).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(`User updated: ${req.body}`);
    });

    it('should handle 404 errors while updating', async () => {
        const req = { params: { id: null }, body: { fullName: 'Updated Name' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        userService.updateUser.mockResolvedValue(null);

        await updateUser(req, res);

        expect(userService.updateUser).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(`This id does not exist`);
    });

    it('should handle 500 errors while updating', async () => {
        const req = { params: { id: 1 }, body: { fullName: 'Updated Name' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const errorMessage = 'Internal Server Error';

        userService.updateUser.mockRejectedValue(new Error(errorMessage));

        await updateUser(req, res);

        expect(userService.updateUser).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Error updating user`);
    });
});

