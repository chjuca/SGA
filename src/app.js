const multer = require('multer');
const path = require('path');
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//Importando Routes
import userRoutes from './routes/users';
import credentialRoutes from './routes/credentials';
import loginRoutes from './routes/login';
import categoryRoutes from './routes/category';
import PostRoutes from './routes/posts';
import AssentsRoutes from './routes/assets';

//initializations
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));

//Routes
app.use('/api/users', userRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/post', PostRoutes);
app.use('/api/assent', AssentsRoutes);


//Routes *** LOGIN ***
app.use('/api/login', loginRoutes);


export default app;