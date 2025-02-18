const RequestUtil = {
  prepareListResponse(status, data, message) {
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
  },
  prepareListFromQueryResponse(status, data, message) {
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
  },
  prepareResponse(status, message, data,links) {
    return {
      status: status,
      message: message,
      meta: {
        "version": "1.0.0",
        "language": "es"
      },
      links: links,
      timestamp: new Date(),
      data: data,
    };
  },
  validParam(param) {
    return param !== undefined && param !== null;
  }
}

export default RequestUtil;


  