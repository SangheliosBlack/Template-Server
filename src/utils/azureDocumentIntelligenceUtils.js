class AzureDocumentIntelligenceUtils {
  static removeBoundingRegions(obj) {
    if (Array.isArray(obj)) {
      // Si es un array, iteramos cada elemento
      obj.forEach(item => AzureDocumentIntelligenceUtils.removeBoundingRegions(item));
    } else if (typeof obj === 'object' && obj !== null) {
      // Si es un objeto, iteramos sus claves
      Object.keys(obj).forEach(key => {
        if (key === 'boundingRegions' || key === 'spans') {
          // Si la clave es 'boundingRegions', la eliminamos
          delete obj[key];
        } else {
          // Si no, seguimos recorriendo la estructura
          AzureDocumentIntelligenceUtils.removeBoundingRegions(obj[key]);
        }
      });
    }
  }

  static extractFolioFiscalFromContent(content) {
    const folioFiscalPattern = /Folio Fiscal:\s([A-Fa-f0-9-]{36})/;
    const match = content.match(folioFiscalPattern);

    if (match) {
      return match[1];
    }
    return null;
  }
}

export default AzureDocumentIntelligenceUtils;