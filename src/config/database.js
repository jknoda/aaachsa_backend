module.exports = {
    dialect: 'mysql',
    host: 'us-cdbr-east-02.cleardb.com', //'192.168.1.244',
    username: 'bfd835e32c697e', //'aaachsa',
    password: 'de4bd86a', //'senha',
    database: 'heroku_4fd15084841e4fa', //'dbaaachsa',
    define: {
        timestamps: false
    }
}

/* 
    heroku - variavel de ambiente: CLEARDB_DATABASE_URL
    mysql://{user}:{password}@{host}/{bd}?reconnect=true
    porta: 3306

*/