import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

const endpoint = process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT;
const apiKey = process.env.AZURE_DOCUMENT_INTELLIGENCE_API_KEY;

const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const storageAccountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

class DocumentService {
  constructor() {
    // Verificar si las variables de entorno son correctas
    if (!storageAccountName || !storageAccountKey) {
      throw new Error("Las credenciales de la cuenta de almacenamiento son necesarias.");
    }

    this.client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

    // Cliente de Blob Storage con las credenciales correctas
    const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);

    // Construir la URL para el cliente Blob
    this.blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net`,
      sharedKeyCredential
    );
  }

  // Función para obtener SAS Token
  async getBlobSasUrl(blobName) {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Configurar permisos: solo lectura ("r")
      const expiresOn = new Date(new Date().valueOf() + 3600 * 1000); // Expira en 1 hora

      const sasToken = blockBlobClient.generateSasUrl({
        permissions: "r",
        expiresOn,
      });

      return sasToken;
    } catch (error) {
      console.error("Error generando SAS Token:", error.message);
      throw error;
    }
  }

  // Analizar la factura usando la URL SAS
  async analyzeInvoice(blobName) {
    try {
      console.log("📄 Generando SAS Token para análisis...");
      const fileUrl = await this.getBlobSasUrl(blobName);

      if (!fileUrl) {
        throw new Error("No se pudo generar una URL válida con SAS Token.");
      }

      console.log("📄 Analizando factura...");
      const poller = await this.client.beginAnalyzeDocument("prebuilt-invoice", fileUrl);
      const result = await poller.pollUntilDone();

      return result; // Devuelve la información extraída
    } catch (error) {
      console.error("Error al analizar la factura:", error.message);
      throw new Error(`Error al analizar la factura: ${error.message}`);
    }
  }
}

export default new DocumentService();
