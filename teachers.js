const fs = require('fs')
const data = require('./data.json')

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(let key of keys) {
        if(req.body[key] == "") {
            return res.send("Please fill all the fields correctly")
        }
    }

    let {name, birth, avatarUrl, education, monitoring, classType} = req.body

    const createdAt = Date.now()
    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        name,
        avatarUrl,
        birth,
        education,
        classType,
        monitoring,
        createdAt
    })

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if(err) {
            return res.send("It wasn't possible complete your request")
        }

        return res.redirect("/teachers")
    })
}