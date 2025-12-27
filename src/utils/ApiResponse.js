class ApiResponse {
    constructor(statusCode,data, message="Success")// incoming data format
    {
        this.statusCode= statusCode //these below parmeters are the format of api response 
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}