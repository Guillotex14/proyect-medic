import { config } from 'dotenv';

config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jefersonmujica:SkibCc1nKFNmcfb1@cluster0.luvml6n.mongodb.net/?retryWrites=true&w=majority';

export const PORT = process.env.PORT || 3000;