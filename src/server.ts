import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/main';

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', router);

server.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server is running on port ${process.env.BASE_URL}`);
});