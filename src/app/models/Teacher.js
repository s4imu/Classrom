const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT *
        FROM teachers
        ORDER BY name ASC`, function(err, results){
            if(err) {
                throw `Database error! ${err}`
            }

            callback(results.rows)
        })
    },
    create(data, callback) {
    
        const query = `
        INSERT INTO teachers (
            avatarUrl,
            name,
            birthDate,
            educationLevel,
            classType,
            subjectsTaught,
            createdAt
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `

        const values = [
            data.avatarUrl,
            data.name,
            date(data.birthDate).iso,
            data.educationLevel,
            data.classType,
            data.subjectsTaught,
            date(Date.now()).iso
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
        FROM teachers
        WHERE id = $1`, [id], function(err, results) {
            if(err) {
                throw `Database error! ${err}`
            }

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE teachers SET
            avatarUrl=($1),
            name=($2),
            birthDate=($3),
            educationLevel=($4),
            classType=($5),
            subjectsTaught=($6)
            WHERE id = $7
            `

        const values = [
            data.avatarUrl,
            data.name,
            date(data.birthDate).iso,
            data.educationLevel,
            data.classType,
            data.subjectsTaught,
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
        
        db.query(`DELETE from teachers WHERE id = $1`, [id], function(err, results) {
            if(err) {
                throw `Database error! ${err}`
            }

            return callback()
        })
    }
}