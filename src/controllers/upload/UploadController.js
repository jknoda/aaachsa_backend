const Galeria = require('../../models/galeria/Galeria');
const errDB = require('../common/_sendErrorsDB');

const upload = require('./UploadFileController');
// const IncomingForm = require("formidable").IncomingForm;
// const consts = require('../../config/consts');

// module.exports = function upload(req, res) {
//     var form = new IncomingForm({
//         uploadDir: consts.uploadDir
//     });
//     form.on("file", (field, file) => {
//         // Do something with the file
//         // e.g. save it to the database
//         // you can access it using file.path
//         console.log('field',field)
//         console.log('file',file)
//     });
//     form.on("end", () => {
//         res.json();
//     });
//     form.parse(req);
// };

module.exports = {
    salvarGaleria(req, res) {
        const { formData, fields } = req.body;
        upload.upload(formData, res);
    },

    async findAll(req,res){
        const retorno = await Treino.findAll();
        return res.json(retorno);
    },

    async summary(req,res){
        const { EmpIdf } = req.body;

        const retorno = await Treino.count({
            where: {
                EmpIdf: EmpIdf
              }
          })
        .catch(function (err) {
            return errDB(res, err);
        });
        return res.json(retorno);
    }
}
