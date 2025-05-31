
import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import AzureDocumentIntelligenceUtils from '../utils/azureDocumentIntelligenceUtils.js';

import UploadService from "../services/azureUploadService.js";
import DocumentService from "../services/azureDocumentIntelligence.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

var UploadController = {

  uploadTest : catchAsync(async (req, res, next) => {

    try {
      const __filename = fileURLToPath(import.meta.url);
      
      const __dirname = dirname(__filename);

      const filePath = `${__dirname}/../data/mock_azure.json`;

      fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {

          res.status(200).json(
            RequestUtil.prepareResponse(500, "Invoice uploaded and analyzed successfully", {
              data: data['documents']
            })
          );

        }

        const response = JSON.parse(data)['analysis']['documents'][0]['fields'];

        const fiscalFolio = AzureDocumentIntelligenceUtils.extractFolioFiscalFromContent(JSON.parse(data)['analysis']['content']);

        response.FiscalFolio = {
          "kind": "string",
          "value": fiscalFolio,
          "content": fiscalFolio,
          "confidence": 0.99
        };


        AzureDocumentIntelligenceUtils.removeBoundingRegions(response);

        res.status(200).json(
          RequestUtil.prepareResponse(200, "Invoice uploaded and analyzed successfully",response)
        );


      });

      /*
      
      const fileUrl = await UploadService.uploadFile(req.file);

      console.log("📄 File uploaded to: ", fileUrl);
      
      const fileName = req.file.originalname; 

      const analysisResult = await DocumentService.analyzeInvoice(fileName);

      res.status(200).json(
        RequestUtil.prepareResponse("success", "Invoice uploaded and analyzed successfully", {
          fileUrl,
          analysis: analysisResult,
        })
      );
      */

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse(500, {}, error.message));

    }
  
  })  

}

export default UploadController;
