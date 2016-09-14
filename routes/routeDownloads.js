var util = require('../public/util'),
    logger = require("../public/logger"),
    config = require('../public/config');

exports.downloadFile = function downloadFile(req, res, next) {
    
    var fileId = req.params.fileId;
    var sdk = util.getBOXAPIClient(true, config.ADMIN_ID);

    //sdk.files.getDownloadURL(fileId, null, function (err, url) {
    //    if (err) {
            
    //    }
    //    res.redirect(url);
    //});

    sdk.files.getThumbnail(fileId, {}, function (err, data) {
        if (err) {
            res.status(400).json(util.showMessage('error:' + err.message));
        }
        res.set('Content-Type', 'image/png');
        res.send(data.file);
    });
}

