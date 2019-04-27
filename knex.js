const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://owegdvikqqfzoz:84dba32b835cc323af4472a380723118411d64e9eb44aa8bad420068aa9dd1e7@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/ddo30sv8p4u8si?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory",
    ssl: true,
    debug: true
});

module.exports  = {database: sqlDb}