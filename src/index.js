import app from './app';
require('./config/config');


function main(){
    app.listen(process.env.PORT);
    console.log('Server on port:', process.env.PORT)
};

main();