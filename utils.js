module.exports = {
    age: function age(timestamp) {
        const today = new Date
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getUTCMonth() - birthDate.getUTCMonth()

        if(month < 0 || month == 0 && today.getUTCDate() < birthDate.getUTCDate){
            age = age - 1
        }
        
        return age
    },
    education: function education(education) {
        let degree =  "High school degree"

        if(education == "higher") {
            degree = "Higher Education degree"
        } else if(education == "masters") {
            degree = "Master's degree"
        } else if(education == "doctorate") {
            degree = "Doctorate degree"
        }
        
        return degree
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}