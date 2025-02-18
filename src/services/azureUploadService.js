import { BlobServiceClient } from "@azure/storage-blob";
import fs from "fs";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

class UploadService {
  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(file) {

    if (!file) {
      throw new Error("No file received.");
    }

    const filePath = file.path;
    const fileName = file.originalname;

    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
    const fileBuffer = fs.readFileSync(filePath);

    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    
    return blockBlobClient.url;
    
  }
}

export default new UploadService();
