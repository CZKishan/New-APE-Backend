function responseMapping(code , msg) {
    return {
        responseCode: code,
        responseMessage: msg
    }
}

function responseMappingWithData(code, msg, data) {
    return {
        responseCode: code,
        responseMessage: msg,
        responseData: data
    }
}

function filterUserResponseFields(obj) {
    let { _id, firstname, lastname, email, password, token } = obj
    return {
        _id, firstname, lastname, email, password, token
    }
}

module.exports = {
    responseMapping,
    responseMappingWithData,
    filterUserResponseFields
}