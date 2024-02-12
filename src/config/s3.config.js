// Importa las clases y funciones específicas de la versión 3
const { S3Client } = require('@aws-sdk/client-s3');
const { fromEnv } = require('@aws-sdk/credential-provider-env');

// Configuración del cliente y credenciales
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: fromEnv(),
});

const uploadParams = {
  Bucket: process.env.Bucket,
  Key: '', // Pasa la clave
  Body: null, // Pasa el cuerpo del archivo
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;
