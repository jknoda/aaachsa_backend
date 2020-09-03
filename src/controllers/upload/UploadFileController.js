const IncomingForm = require("formidable").IncomingForm;
const consts = require('../../config/consts');

module.exports = {
    upload(req, res) {
        var _file;
        var form = new IncomingForm({
            uploadDir: consts.uploadDir
        });
        form.on("file", (field, file) => {
            // Do something with the file
            // e.g. save it to the database
            // you can access it using file.path
            _file = file;
        });
        form.on("end", () => {
            res.json(
                {
                    path: _file.path,
                    name: _file.name,
                    type: _file.type
                });
        });
        form.parse(req);
    }
};
