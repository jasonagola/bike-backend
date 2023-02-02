const verifyRoles = (...allowewdRoles) => {
    return (req, res, next) => {
        if (!req?.roles)  return res.sendStatus(401)
        const rolesArray = [...allowewdRoles]
        console.log(rolesArray);
        console.log(req.roles);
        const result = request.roles.map(role => rolesArray.includes(role)).find(value => value === true);
        if (!result) return res.sendStatus(401)
        next();
    }
}

module.exports = verifyRoles