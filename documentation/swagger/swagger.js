import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Muffin',
            version: '0.0.1',
            description: 'Booshtie',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    schema: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ['./routes/*/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

function generateDoc(app, port) {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

    app.get('docs.json', (request, response) => {
        response.setHeader('Content-Type', "application/json");
        response.send(swaggerDocs);
    });

    console.log('documentation is available at http://localhost:3000/api-docs');
}

export default generateDoc;
