import express, {json} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//Importando Routes
import userRoutes from './routes/users';
import credentialRoutes from './routes/credentials';
import loginRoutes from './routes/login';
import categoryRoutes from './routes/category';

//initializations
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Routes
app.use('/api/users', userRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/category', categoryRoutes);


//Routes *** LOGIN ***
app.use('/api/login', loginRoutes);


export default app;