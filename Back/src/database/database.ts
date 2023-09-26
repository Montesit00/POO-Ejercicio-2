const { connect } = require("mongoose");

//conexion a mongo
export async function connectMongo() {
    try{
        const db = await connect('mongodb+srv://monte:monte123@monte.xnfkexl.mongodb.net/progra');
        console.log('Base de datos conectada ',db.connection.db.databaseName);
    }catch(error){
        console.log("error en la conexion", error)
    }
}