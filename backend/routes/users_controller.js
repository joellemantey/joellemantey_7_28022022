const user = require('./users');
const db = require("../database");


const getUsers = (req, res, next) => {
    const sql = 'select * from user'
    db.all(sql, function (err, row) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (!row) {
            res.status(204).json();
            return;
        }
        res.json({
            "message": "success",
            "data": row,
        })
    });
}

const getUserById = (req, res, next) => {
    const sql = 'select * from user where id = ?'
    const params = [req.params.id]
    db.get(sql, params, function (err, row) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (!row) {
            res.status(204).json();
            return;
        }
        res.json({
            "message": "success",
            "data": row,
        })
    });
}

const deleteUser = (req, res, next) => {
    const sql = 'delete from user where id = ?';
    const params = [req.params.id]
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": this.changes,
        })
    });
};

module.exports = {getUsers, getUserById, deleteUser}
