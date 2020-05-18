const fs = require('fs')
const data = require('../data.json')
const { date, grade } = require('../utils')

exports.index = function(req, res){
    let students = []
        for (let student of data.students){
            students.push({
                ...student,
                schoolYear: grade(student.schoolYear).split(",")
            })
        }
    return res.render('students/index', {students})
 }

exports.create =  function(req,res) {
    return res.render('students/create')
 }
 
 exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(let key of keys) {
        if(req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    birth = Date.parse(req.body.birth)
   
    let lastStudent = data.students[data.students.length - 1]
    let id = 1

        if(lastStudent){
            id = lastStudent.id + 1
        }

    data.students.push({
        ...req.body,
        id,
        birth
    })
    
    
    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err) {
        if(err) {
            return res.send("Erro")
        }
    
        return res.redirect("/students")
    })

}

exports.show = function(req, res) {
    
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id ==id
    }) 

    if(!foundStudent) {
        res.send("Student not found")
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        schoolYear: grade(foundStudent.schoolYear)
    }

    return res.render("students/show", { student })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudent){
        return res.send("Student not found")
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student })

}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if(student.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundStudent){
        return res.send("Student not found")
    }

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err){
            return res.send("Update file error")
        }

        return res.redirect(`/students/${id}`)
    })

    

}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err){
            return res.send("Error delete file")
        }
        return res.redirect('/students')
    })
}