const { age, education, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {

        return res.render('teachers/index')
    },
    create(req, res) {
        
        return res.render('teachers/create')
    },
    show(req, res) {
        
        return
    },
    post(req, res) {
        
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }
        
        return
    },
    edit(req, res) {

        return 
    },
    put(req, res) {
       
        const keys = Object.keys(req.body)
    
        for(let key of keys) {
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }

        return 
    },
    delete(req, res){
      
        return 
    }
}