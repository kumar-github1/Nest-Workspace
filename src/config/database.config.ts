import { registerAs } from "@nestjs/config";

export default registerAs('database',()=>({
        host : process.env.DB_HOST || 'localhost',
        port : process.env.DB_PORT || 5432,
        dbname : process.env.DB_NAME || 'nestjs',
        dbpass : process.env.DB_PASSWORD || 'kumar...'
}))