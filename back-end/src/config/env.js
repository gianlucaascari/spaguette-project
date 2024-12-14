import dotenv from 'dotenv'

dotenv.config()

const ENV = {
    JWT_KEY: process.env.JWT_KEY,
    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME,
    DB_USERS_COL: "Users",
    DB_FRIEN_COL: "Friendships",
    DB_INGRE_COL: "Ingredients",
    DB_RECIP_COL: "Recipes",
    DB_ADDRE_COL: "AddRequests"
}

export { ENV };