const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const AnimalController = require('./controllers/AnimalController');
const multer = require("multer");
const fs = require('fs');

// ตั้งค่า Multer สำหรับการอัปโหลดไฟล์
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function(req, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
});

// ตัวกรองไฟล์เพื่อให้แน่ใจว่าอัปโหลดได้เฉพาะรูปภาพ
let upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
}).array("userPhoto", 10);

// Routes
module.exports = (app) => {

    // Upload section
    app.post("/upload", function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                return res.status(500).json({ error: "Error uploading file", details: err });
            }
            res.status(200).json({ message: "File is uploaded" });
        });
    });

    // Delete uploaded file
    app.post('/upload/delete', async function(req, res) {
        const filePath = process.cwd() + '/public/uploads/' + req.body.filename;
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error deleting file', details: err });
                }
                res.status(200).json({ message: "File deleted successfully" });
            });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    });

    // User routes
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);

    // Animal routes
    app.post('/Animal', AnimalController.create);
    app.put('/Animal/:AnimalId', AnimalController.put);
    app.delete('/Animal/:AnimalId', AnimalController.remove);
    app.get('/Animal/:AnimalId', AnimalController.show);
    app.get('/Animal', AnimalController.index);

};
