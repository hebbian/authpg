var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (typeof req.db == 'undefined') {
        res.send('req.db undefined');
    } else {
        req.db.query("SELECT * FROM users", function(err, result) {
            if (err) {
                res.send("Error: ", err);
            } else {
                res.send(result.rows);
            }
        });
    }
});


module.exports = router;
