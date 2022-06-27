const post = require('./posts_router');
const db = require('../database');

const create = (req, res, next) => {
    console.log(req.body)
    const data = {
        contenu: req.body.contenu,
        contenu_multimedias: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }
    const sql = 'INSERT INTO post (contenu, contenu_multimedias,user_id) VALUES (?,?,?)'
    const params = [data.contenu, data.contenu_multimedias, req.auth.userId]
    db.run(sql, params, function (err, row, result) {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID
            })
        }
    });
}

const getPosts = (req, res, next) => {
    const sql = 'select p.*, u.nom, u.prenom, u.job from post p' +
        ' left join user u on u.id = p.user_id';

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

const getPostsById = (id) => {
    const sql = 'select * from post where id = ?'
    const params = [id]
    return new Promise((resolve, reject) => {
        db.get(sql, params, function (err, row) {
            if (err) {
                reject(err);
            }
            if (!row) {
                 resolve(null);
            }

            resolve(row);
        });
    });
}

const modifyPost = (req, res, next) => {
    const data = {
        contenu: req.body.contenu,
        contenu_multimedias: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image,
    }
    const sql = 'update post set contenu = ? , contenu_multimedias = ? where id = ?'
    const params = [data.contenu, data.contenu_multimedias, req.params.id]
    db.run(sql, params, function (err, row, result) {
        if (err) {
            return console.error(err.message);
        } else {
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID
            })
        }
        console.log(`Row(s) updated: ${this.contenu}, ${this.contenu_multimedias}`);

    });
}

async function controlUser(userId, postId) {
    const post = await getPostsById(postId);
    if (post.user_id === userId && Number(postId) === post.id) {
        return true
    } else {
        return false
    }
}

const deletePost = async (req, res, next) => {
    const canDelete = await controlUser(req.auth.userId, req.params.id);
    if (canDelete) {
        const sql = 'delete from post where id = ?';
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
    } else {
        throw 'Invalid user ID'
    }
};

module.exports = {
    create, getPostsById, deletePost, getPosts, modifyPost
}
