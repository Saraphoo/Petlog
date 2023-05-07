const signin = function(req,res) {
    let username = req.body.username;
    let password = req.body.password;
    res.append('Content-Type', 'application/json');

    res.status(200).send({username: username, password: password});
}

module.exports = {
    signin,
}