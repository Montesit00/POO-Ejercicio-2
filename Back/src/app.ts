import express,{ Application } from 'express';
import cors from 'cors';
import { connectMongo } from './database/database';
import { routerProductos } from './Producto/producto.routes';
import { productoServiceMongo } from './Producto/services/producto.mongo.service';
import { VentaServiceMongo } from './Venta/services/venta.mongo.service';
import { RouterVenta } from './Venta/venta.routes';

export function startService(){
    //se instancia express
    const app: Application = express();

    // middlewares
    app.use(express.json());
    app.use(cors());

    // rutas
    app.use('/', routerProductos(new productoServiceMongo()));
    app.use('/', RouterVenta(new VentaServiceMongo()));

    app.listen('3000',()=>{
        connectMongo();
        console.log("Servidor corriendo en http://localhost:3000")
    });

    return app
};