const { age, education, date, array } = require('../../lib/utils')
const Teacher = require('../models/Teacher')

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
            callback(teachers) {
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                let newTeachers = array(teachers)

                return res.render('teachers/index', { teachers: newTeachers, pagination, filter })
            }
        }

        Teacher.paginate(params)

    },
    create(req, res) {
        
        return res.render('teachers/create')
    },
    show(req, res) {
        
        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) {
                return res.send("Teacher not found")
            }

            teacher.age = age(teacher.birth_date)
            teacher.education_level = education(teacher.education_level)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.created_at = date(teacher.created_at).format

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

            teacher.birth_date = date(teacher.birth_date).iso
        
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