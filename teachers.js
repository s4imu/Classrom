const fs = require('fs')
const data = require('./data.json')
const { age, education, date } = require('./utils')

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

exports.show = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher){
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        monitoring: foundTeacher.monitoring.split(","),
        education: education(foundTeacher.education),
        createdAt: Intl.DateTimeFormat("pt-BR").format(foundTeacher.createdAt)
    }

    return res.render("teachers/show", { teacher })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher){
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })

}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(teacher.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher){
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err){
            return res.send("Update file error")
        }

        return res.redirect(`/teachers/${id}`)
    })

    

}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err){
            return res.send("Error delete file")
        }
        return res.redirect('/teachers')
    })
}