import request from 'supertest';
import express, { Express } from 'express';
import AuthController from '../src/users/controllers/authController';
import UserService from '../src/users/services/userServices';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../src/users/services/userServices'); // mocks the userServices module
const mockUserService = UserService as jest.MockedClass<typeof UserService>; // sets type of mockUserService to be the mocked UserService class

describe('AuthController', () => {
    let app: Express;
    let authController: AuthController;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        authController = new AuthController();
        app.post('/register', authController.register);
        app.post('/login', authController.login);
    });

    describe('register', () => {
        it('should register a new user and return 201', async () => {
            const mockUser = {
                user: {
                    id: 1,
                    firstName: 'Diego',
                    lastName: 'Alvarez',
                    email: 'Diego@gmail.com'
                },
                token: 'mockToken'
            };
            // tells jest to return the mockUser when the registerUser method is called on the UserService class
            mockUserService.prototype.registerUser.mockResolvedValue(mockUser);

            const registeredUser = {
                firstName: 'Diego',
                lastName: 'Alvarez',
                email: 'Diego@gmail.com',
                password: 'dummyPassword'
            };

            // simulates the post request to the /register endpoint
            const res = await request(app).post('/register').send(registeredUser);


            expect(res.body).toEqual({
                status: 201,
                success: true,
                message: "registration success",
                ...mockUser // spread syntax unpacks the mockUser object into this new object
            });
            expect(res.status).toBe(201);
        });
    });

    describe('login', () => {
        it('should login successfully and return 200', async () => {
            const mockResponse = {
                user: {
                    id: 1,
                    firstName: 'Leti',
                    lastName: 'Alvarez',
                    email: 'Leti@gmail.com'
                },
                token: 'mockToken',
            };
            // tells jest to return the mockResponse when the loginUser method is called on the UserService class
            mockUserService.prototype.loginUser.mockResolvedValue(mockResponse);

            const loginUser = {
                email: 'Leti@gmail.com',
                password: 'dummyPassword'
            };

            // simulates the post request to the /login endpoint
            const res = await request(app).post('/login').send(loginUser);

            expect(res.body).toEqual({
                status: 200,
                success: true,
                message: "Login success",
                ...mockResponse
            });
            expect(res.status).toBe(200);
        });
    });
});
