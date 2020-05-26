const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT *
        FROM students
        ORDER BY name ASC`, function(err, results){
            if(err) {
                throw `Database error! ${err}`
            }

            callback(results.rows)
        })
    },
    create(data, callback) {
    
        const query = `
        INSERT INTO students (
            avatarUrl,
            name,
            email,
            birth,
            schoolYear,
            classHours
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        const values = [
            data.avatarUrl,
            data.name,
            data.email,
            date(data.birthDate).iso,
            data.schoolYear,
            data.classHours
        ]

        db.query(query, values, function(err, results) {
            if(err) {
                throw `Database error! ${err}`
            } 

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT *
        FROM students
        WHERE id = $1`, [id], function(err, results) {
            if(err) {
                throw `Database error! ${err}`
            }

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE students SET
            avatarUrl=($1),
            name=($2),
            email=($3),
            birth=($4),
            schoolYear=($5),
            classHours=($6)
            WHERE id = $7
            `

        const values = [
            data.avatarUrl,
            data.name,
            data.email,
            date(data.birthDate).iso,
            data.schoolYear,
            data.classHours,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) {
                throw `Database error! ${err}`
            }

            callback()
        })
    },
    delete(id, callback){
        
        db.query(`DELETE from students WHERE id = $1`, [id], function(err, results) {
            if(err) {
                throw `Database error! ${err}`
            }

            return callback()
        })
    }
}