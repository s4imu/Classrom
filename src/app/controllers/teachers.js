const { age, education, date } = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
    index(req, res) {

        Teacher.all(function(teachers) {

            let newTeachers = []
            for (let teacher of teachers){
                newTeachers.push({
                    ...teacher,
                    subjectsTaught: teacher.subjectsTaught.split(",")
                })
            }

        return res.render('teachers/index', {teachers: newTeachers})

        })

    },
    create(req, res) {
        
        return res.render('teachers/create')
    },
    show(req, res) {
        
        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) {
                return res.send("Teacher not found")
            }

            teacher.age = age(teacher.birth)
            teacher.educationLevel = education(teacher.educationLevel)
            teacher.subjectsTaught = teacher.subjectsTaught.split(",")
            teacher.createdAt = date(teacher.createdAt).format

            return res.render("teachers/show", { teacher })
        })
    },
    post(req, res) {
        
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }
        
        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    edit(req, res) {

        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) {
                return res.send("Teacher Not Found")
            }

            teacher.birth = date(teacher.birth).iso
        
            return res.render("teachers/edit", { teacher })
        })
    },
    put(req, res) {
       
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }

        Teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res){
      
        Teacher.delete(req.body.id, function() {
            return res.redirect("/teachers")
        })
    }
}