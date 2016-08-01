exports.exculdeFields = {
    __v: false,
    _id: false
};

exports.showMessage=function showMessage(errMsg) {
    return { 'message': errMsg }
}