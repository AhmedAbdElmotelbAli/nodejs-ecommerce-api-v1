// @desc    this class is responsible about operation errors (errors that i can predict)

class ApiError extends Error{
    constructor(message, StatusCode){
        super(message);
        this.StatusCode=StatusCode;
        this.status= `${StatusCode}`.startsWith(4)?'fail':'error';
        this.isOperational = true;
    }
}
module.exports = ApiError;