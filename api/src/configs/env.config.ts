import * as dotenv from 'dotenv';
const env = process.env.NODE_ENV ? process.env.NODE_ENV : process.env.ENV;
const config = dotenv.config({ path: `./.env.${env}` });
export default config;
