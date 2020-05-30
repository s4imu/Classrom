const { date } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return res.render('students/index', { students, pagination, filter })
            }
        }

        Student.paginate(params)

    },
    create(req, res) {
        
        Student.teacherSelectOption(function(options) {
            return res.render('students/create', { teacherOptions: options })
        })
    },
    show(req, res) {
        
        Student.find(req.params.id, function(student) {
            if(!student) {
                return res.send("Student not found")
            }

            student.birth = date(student.birth).birthDay

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
        
            Student.teacherSelectOption(function(options) {
                return res.render('students/edit', { student, teacherOptions: options })
            })
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