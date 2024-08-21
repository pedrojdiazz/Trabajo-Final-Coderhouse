import dotenv from "dotenv";

dotenv.config();
const configObject = {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
}
export default configObject;