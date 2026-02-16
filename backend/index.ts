import express from 'express';
import cors from 'cors';
import { routes } from './http/routes/routes';

const PORT = process.env.HTTP_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});