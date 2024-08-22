import UserModel from "../../models/users.model.js";
import CartManager from "./cart-manager.js";


class UserManager {
    
    async addUser({ first_name, last_name, email, age, password,  role="user"}) {
        try {
            if(!first_name || !last_name || !email || !password || !age) return -1

            const existUser = await UserModel.findOne({email: email})

            if (existUser) return null
            
            const newUser = new UserModel({
                first_name,
                last_name,
                email,
                age,
                password,
                cart: await CartManager.createCart(),
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
            const user = await UserModel.findOne({email: email})
            if (!user) return null;
            return user
        } catch (error) {
            throw error;
        }
    }
}

export default new UserManager();