const fs = require('fs');
const path = require('path');

const generateRoutes = (modelName) => {

    const modelsPath = path.join(__dirname, '..', 'models');

    // Load models
    const modelFile = fs.readdirSync(modelsPath)
        .find(file => file.toLowerCase() === `${modelName.toLowerCase()}.js`);

    if (!modelFile) {
        console.error(`El modelo ${modelName} no se encontró.`);
        return;
    }

    const Model = require(path.join(modelsPath, modelFile));
    const modelFields = Model.getFieldsInfo();
    
    
        const modelNameCamelCase = modelName.charAt(0).toUpperCase() + modelName.slice(1);

        console.log(`Rutas generadas para el modelo ${modelNameCamelCase}`);

        // Generar controlador
        const controllerContent = `const ${modelNameCamelCase} = require('../models/${modelName}');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const ${modelNameCamelCase}Controller = {
    getAll${modelNameCamelCase}: catchAsync(async (req, res, next) => {
        try {
            const ${modelNameCamelCase.toLowerCase()} = await ${modelNameCamelCase}.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', ${modelNameCamelCase.toLowerCase()}, 'data'));
        } catch (error) {
            next(new AppError(500, 'An error occurred in this operation.', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    get${modelNameCamelCase}ById: catchAsync(async (req, res, next) => {
        try {
            const ${modelNameCamelCase.toLowerCase()} = await ${modelNameCamelCase}.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', ${modelNameCamelCase.toLowerCase()}, 'data'));
        } catch (error) {
            next(new AppError(500, 'An error occurred in this operation.', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createNew${modelNameCamelCase}: catchAsync(async (req, res, next) => {
        try {
            const new${modelNameCamelCase} = new ${modelNameCamelCase}(req.body);
            await new${modelNameCamelCase}.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ${modelNameCamelCase.toLowerCase()}: new${modelNameCamelCase} }, 'data'));
        } catch (error) {
            next(new AppError(500, 'An error occurred in this operation.', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    update${modelNameCamelCase}: catchAsync(async (req, res, next) => {
        try {
            const ${modelNameCamelCase.toLowerCase()} = await ${modelNameCamelCase}.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', ${modelNameCamelCase.toLowerCase()}, 'data'));
        } catch (error) {
            next(new AppError(500, 'An error occurred in this operation.', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    delete${modelNameCamelCase}: catchAsync(async (req, res, next) => {
        try {
            await ${modelNameCamelCase}.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'An error occurred in this operation.', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = ${modelNameCamelCase}Controller;
`;

        const controllerPath = path.join(__dirname, '..', 'controllers2', `${modelName.toLowerCase()}Controller.js`);
        fs.writeFileSync(controllerPath, controllerContent);

        //console.log(`Controlador generado para el modelo ${modelNameCamelCase}`);

        const paramList = modelFields.map(param => {
            return `
 *       - in: path
 *         name: ${param.name}
 *         required: ${param.properties.isRequired}
 *         schema:
 *           type: ${param.properties.instance}`;
          }).join('');

        const routerContent = `
const express = require('express');
const passport = require('passport');
const ${modelNameCamelCase}Controller = require('../controllers2/${modelName.toLowerCase()}Controller');
const checkPermissions = require('../middlewares/checkPermissions');
const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

/**
 * @swagger
 * tags:
 *   name: ${modelNameCamelCase}
 *   description: API endpoints for ${modelNameCamelCase}
 */

/**
 * @swagger
 * /${modelName.toLowerCase()}:
 *   get:
 *     summary: Retrieve a list of ${modelNameCamelCase}
 *     description: Retrieve a list of all ${modelNameCamelCase}
 *     tags: [${modelNameCamelCase}]
 *     responses:
 *       200:
 *         description: A list of ${modelNameCamelCase}
 */
router.get("/", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.getAll${modelNameCamelCase});

/**
 * @swagger
 * /${modelName.toLowerCase()}:
 *   post:
 *     summary: Create a new ${modelNameCamelCase}
 *     description: Create a new ${modelNameCamelCase}
 *     tags: [${modelNameCamelCase}]
 *     parameters: ${paramList}
 *     requestBody:
 *       description: ${modelNameCamelCase} data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${modelNameCamelCase}'
 *     responses:
 *       200:
 *         description: ${modelNameCamelCase} created successfully
 */
router.post("/", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.createNew${modelNameCamelCase});

/**
 * @swagger
 * /${modelName.toLowerCase()}/{id}:
 *   get:
 *     summary: Retrieve a single ${modelNameCamelCase} by ID
 *     description: Retrieve a single ${modelNameCamelCase} by ID
 *     tags: [${modelNameCamelCase}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ${modelNameCamelCase}
 */
router.get("/:id", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.get${modelNameCamelCase}ById);

/**
 * @swagger
 * /${modelName.toLowerCase()}/{id}:
 *   patch:
 *     summary: Update a ${modelNameCamelCase} by ID
 *     description: Update a single ${modelNameCamelCase} by ID
 *     tags: [${modelNameCamelCase}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: ${modelNameCamelCase} data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${modelNameCamelCase}'
 *     responses:
 *       200:
 *         description: ${modelNameCamelCase} updated successfully
 */
router.patch("/:id", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.update${modelNameCamelCase});

/**
 * @swagger
 * /${modelName.toLowerCase()}/{id}:
 *   delete:
 *     summary: Delete a ${modelNameCamelCase} by ID
 *     description: Delete a single ${modelNameCamelCase} by ID
 *     tags: [${modelNameCamelCase}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ${modelNameCamelCase} deleted successfully
 */
router.delete("/:id", checkPermissions('read', 'all'), ${modelNameCamelCase}Controller.delete${modelNameCamelCase});

module.exports = router;
`;

// Imprimir el contenido del router para verificar
//console.log(routerContent);


//console.log(routerContent);


        
        // Generar archivo de rutas
        const routerPath = path.join(__dirname, '..', 'routes2', `${modelName.toLowerCase()}_Routes.js`);
        fs.writeFileSync(routerPath, routerContent);

        //console.log(`Archivo de rutas generado para el modelo ${modelNameCamelCase}`);


        
};

if (process.argv.length < 3) {
    console.error('Por favor, proporciona el nombre del modelo como argumento.');
    process.exit(1); // Salir con código de error
}

const modelName = process.argv[2];

console.log(modelName);

// Llamar a la función con el nombre del modelo proporcionado como argumento
generateRoutes(modelName);
