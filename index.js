import express from 'express';
import Accounts from './routes/account.js';
import Company from './routes/company.js';
import Store from './routes/store.js';
import Database from './database.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Store API Endpoints',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3001'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis:['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-doc', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

app.use('/api/account', Accounts);
app.use('/api/company', Company);
app.use('/api/store', Store);

const port = 3001;

Database
.sync()
.then(results => {
    console.log(results)
    app.listen(port, function(){
        console.log(`Server is running via port ${port}`);
    })
})
.catch(error => {
    console.log(error)
})

