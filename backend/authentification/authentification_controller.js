const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../routes/users');
const db = require('../database');

// FIXME retourne error 400 a la création d'un login - A vérifier
exports.signup = (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const data = {
                email: req.body.email,
                password: hash,
                nom: req.body.nom,
                prenom: req.body.prenom,
                job: req.body.job,
                departement: req.body.departement
            }
            const sql = 'INSERT INTO user (email, password, nom, prenom, job, departement) VALUES (?,?,?,?,?,?)'
            const params = [data.email, data.password, data.nom, data.prenom, data.job, data.departement]
            db.run(sql, params, function (err, result) {
                if (err) {
                    res.status(400).json({"error": err.message})
                    return;
                }
                res.json({
                    "message": "success",
                    "data": data,
                    "id": this.lastID
                })
            });
        });
}

exports.login = (req, res, next) => {

    var sql = "select * from user where email = ?";
    var params = [req.body.email];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        console.log(row)
        if(!row){
            res.status(204).json();
            return;
            console.log("here")
        }
        console.log('toto')
        bcrypt.compare(req.body.password, row.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: row.id,
                    token: jwt.sign(
                        {userId: row.id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    });
};
