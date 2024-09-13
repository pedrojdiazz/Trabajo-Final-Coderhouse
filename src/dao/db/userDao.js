import UserModel from "../models/userModel.js";


class UserDao {

    async addUser({ first_name, last_name, email, age, password, role = "user", cartId }) {
        try {
            const newUser = new UserModel({
                first_name,
                last_name,
                email,
                age,
                password,
                cart: cartId,
                role
            })

            await newUser.save()
            return newUser

        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await UserModel.findOne({ email: email })
            if (!user) return null;
            return user
        } catch (error) {
            throw error;
        }
    }
}

export default new UserDao();