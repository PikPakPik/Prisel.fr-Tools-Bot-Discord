const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'XXXX',
    user: 'XXXX',
    password: 'XXXXX'
});


con.connect(function (err) {
    if (err) {
        console.log(`Db failed to connect Ouput:${err.message}`);
        setTimeout(con.connect, 2000);
    }
});

con.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('DB disconnected attempting reconnection')
        con.connect((err) => {
            if (err) throw err;
            console.log('DB reconnected !')
        });
    } else {
        throw err;
    }
})
con.on('connect', () => {
    console.log(`Connected !`)
})

module.exports = {
    dbConnect: () => {
        return con
    }
}