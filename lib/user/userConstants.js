let messages = {
    InvalidDetails: 'Please provide valid details.',
    EmailAllreadyExist: 'Account with the same email id is already been created. Please try signIn instead',
    UserCreatedSuccessfully: 'User Register with APE Successfully',
    InternalServerError: 'Internal Server Error',
    UserVerifiedSuccess: 'User successfully login'
}

let codes = {
    FRBDN: 403,
    INTRNLSRVR: 500,
    Success: 200,
    DataNotFound: 404,
    BadRequest: 400,
}

module.exports = {
    CODE: codes,
    MESSAGE: messages
}