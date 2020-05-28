module.exports = {
    age(timestamp) {
        const today = new Date
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getUTCMonth() - birthDate.getUTCMonth()

        if(month < 0 || month == 0 && today.getUTCDate() < birthDate.getUTCDate){
            age = age - 1
        }
        
        return age
    },
    education(education) {
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
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        } 
    },
    grade(schoolYear) {
        let grade =  "6th Grade"

        if(schoolYear == "7th") {
            grade = "7th Grade"
        } else if(schoolYear == "8th") {
            grade = "8th Grade"
        } else if(schoolYear == "9th") {
            grade = "Freshman Year"
        } else if(schoolYear == "10th") {
            grade = "Sophomore Year"
        } else if(schoolYear == "11th") {
            grade = "Junior Year"
        }  else if(schoolYear == "12th") {
            grade = "Senior Year"
        }
        
        return grade
    },
    array(array) {
        let newArray = []
        for (let element of array){
            newArray.push({
                ...element,
                subjects_taught: element.subjects_taught.split(",")
            })
        }

        return newArray
    }
}