const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbiden",
    404: "Not Found",
    409:"Cоnflict",
    
}

const HttpError = (status, message=messageList[status]) => { 
    const error = new Error(message);
    error.status = status;
    return error; 

}


module.exports = HttpError;