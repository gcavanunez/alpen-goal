import db from '../../database/db';

export default class UserRepository {

    // used for registration - creates a new user
    public async createUser(firstName: string, lastName: string, email: string, password: string) {
        try {
            const newUser = await db.query(
                "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email, created_at",
                [firstName, lastName, email, password]
            );
            return newUser.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user.');
        }
    }

    // used for registration - counts no. of rows with matching email
    public async checkUserExists(email: string) {
        try {
            const checkUser = await db.query(
                "SELECT COUNT(*) FROM users WHERE email = $1",
                [email]
            );
            return parseInt(checkUser.rows[0].count) > 0; // converts pg string to int and returns true if count > 0
        } catch (error) {
            console.error('Error checking if user exists:', error);
            throw new Error('Failed to check if user exists.');
        }
    }

    // used for login - selects the user with matching email
    public async findUserByEmail(email: string) {
        try {
            const findUser = await db.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
            return findUser.rows[0]; // return the table row for the user if found. Undefiend if not
        } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Failed to find user.');
        }
    }

    public async readAllUsers() {
        try {
            const users = await db.query("SELECT id, first_name, last_name, email, created_at, updated_at FROM users");
            return users.rows;
        } catch (error) {
            console.error('Error reading all users:', error);
            throw new Error('Failed to read all users.');
        }
    }

    public async readUserById(id: number) {
        try {
            const user = await db.query("SELECT id, first_name, last_name, email, created_at, updated_at FROM users WHERE id = $1",
                [id]
            );
            return user.rows[0];
        } catch (error) {
            console.error('Error reading user by id:', error);
            throw new Error('Failed to read user by id.');
        }
    }

    public async updateUserName(id: number, new_first_name: string, new_last_name: string) {
        try {
            const updatedUser = await db.query(
                "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING id, first_name, last_name, email, created_at, updated_at",
                [new_first_name, new_last_name, id]
            );
            return updatedUser.rows[0];
        } catch (error) {
            console.error('Error updating user name:', error);
            throw new Error('Failed to update user name.');
        }
    }

    public async updateUserEmail(id: number, new_email: string) {
        try {
            const updatedUser = await db.query(
                "UPDATE users SET email = $1 WHERE id = $2 RETURNING id, first_name, last_name, email, created_at, updated_at",
                [new_email, id]
            );
            return updatedUser.rows[0];
        } catch (error) {
            console.error('Error updating user email:', error);
            throw new Error('Failed to update user email.');
        }
    }

    public async updateUserPassword(id: number, new_password: string) {
        try {
            const updatedUser = await db.query(
                "UPDATE users SET password = $1 WHERE id = $2 RETURNING id, first_name, last_name, email, created_at, updated_at",
                [new_password, id]
            );
            return updatedUser.rows[0];
        } catch (error) {
            console.error('Error updating user password:', error);
            throw new Error('Failed to update user password.');
        }
    }

    public async deleteUserById(id: number) {
        try {
            const deletedUser = await db.query(
                "DELETE FROM users WHERE id = $1 RETURNING id, first_name, last_name, email, created_at, updated_at",
                [id]
            );
            return deletedUser.rows[0];
        } catch (error) {
            console.error('Error deleting user by id:', error);
            throw new Error('Failed to delete user by id.');
        }
    }

};
