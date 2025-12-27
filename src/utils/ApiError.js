/*
ApiError is we have defined as  a custom error class used to send structured, consistent API errors across your backend.
 */


class ApiError extends Error{
    constructor(  // by default
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){ // overriding the constructor
        super(message) //calling parent constructor(Error's constructor) without this , this. is undefined
        this.statusCode = statusCode  // these below parameter are telling the api error format 
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}