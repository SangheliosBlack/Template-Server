exports.prepareListResponse = (status, data, message) => {
    if (data) {
      return {
        status: status,
        message: message,
        doc: { data: data },
      };
    }
  
    return {
      status: status,
      message: message,
      doc: { data: { count: 0, rows: [] } },
    };
  };
  
  exports.prepareListFromQueryResponse = (status, data, message) => {
    if (data) {
      return {
        status: status,
        message: message,
        doc: { data: { count: data.length, rows: data } },
      };
    }
  
    return {
      status: status,
      message: message,
      doc: { data: { count: 0, rows: [] } },
    };
  };
  
  exports.prepareSingleResponse = (status, data, message) => {
    return {
      status: status,
      message: message,
      doc: { data },
    };
  };
  
  exports.validParam = (param) => {
    return param !== undefined && param !== null;
  };
  