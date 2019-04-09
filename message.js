exports.getSuccessObj = data => {
    return {
        success: true,
        data
    };
}

exports.getErrorObj = (errorType, errorMsg) => {
    return {
        success: false,
        errorType,
        errorMsg
    };
}

