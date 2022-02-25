const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//paera uso de middelware
app.use(express.json());
app.use(cors());

const whitelist = ['http://localhost:8081', 'http://127.0.0.1:5500', 'http://localhost:3000'];
const options = {
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('no permitido'));
            }
        }
    }
    // app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Hola mi server en express');
})

app.get('/nueva-ruta', (req, res) => {
    res.send('Holasoy una nueva ruta');
});

routerApi(app);

//le indico a la aplicaicon que use los middleware
// si lo dejo asi, el next hace que pase al siguiente. si alte0rno la lienas y uspo promero app.use(errorHandler); este ya rompe
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Mi port' + port);
});
