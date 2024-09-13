import UserDao from '../dao/db/userDao.js';
import CartService from './cartService.js';

class UserService {

    async addUser({ first_name, last_name, email, age, password, role = "user" }) {
        try {
            if (!first_name || !last_name || !email || !password || !age) return -1

            const existUser = await UserDao.getUserByEmail(email)
            if (existUser) return null
            const cart = await CartService.createCart()
            const newUser = await UserDao.addUser({ first_name, last_name, email, age, password, role, cartId: cart._id })

            return newUser

        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await UserDao.getUserByEmail(email)
            if (!user) return null;
            return user
        } catch (error) {
            throw error;
        }
    }
}
export default new UserService();