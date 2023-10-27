const connection = require('../Lib/connect');

async function getMessages(id = 0) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id AS messageId, content, username FROM messages WHERE id > ?';
        connection.query(query, id, (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}

async function saveMessage(data) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO messages SET ?';
        connection.query(query, data, (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve({
                    messageId: res.insertId, 
                    ... data
                });
            }
        });
    });
}

module.exports = {
    getMessages,
    saveMessage
};