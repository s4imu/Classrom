const { grade, date } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {

        Student.all(function(students) {
            let newStudents = []
            for(let student of students){
                newStudents.push({
                    ...student,
                    schoolYear: student.schoolYear.split(",")
                })
            }

            return res.render('students/index', { students: newStudents })
        })

    },
    create(req, res) {
        
        return res.render('students/create')
    },
    show(req, res) {
        
        Student.find(req.params.id, function(student) {
            if(!student) {
                return res.send("Student not found")
            }

            student.birth = date(student.birth).birthDay
            student.schoolYear = grade(student.schoolYear)

            return res.render("students/show", { student })
        })
    },
    post(req, res) {
        
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }
        
        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    },
    edit(req, res) {

        Student.find(req.params.id, function(student) {
            if(!student) {
                return res.send("Student Not Found")
            }

            student.birth = date(student.birth).iso
        
            return res.render("students/edit", { student })
        })
    },
    put(req, res) {
       
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res){
      
        Student.delete(req.body.id, function() {
            return res.redirect("/students")
        })
    }
}