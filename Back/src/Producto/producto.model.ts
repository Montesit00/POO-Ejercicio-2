import { Schema, model } from 'mongoose';
import { Producto } from '../Producto/producto.entity';

//esquema de mongo para producto
const schemaProducto = new Schema<Producto>({
    nombre:{
        type:String,
        require:true
    },
    marca:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
}, {
        timestamps:true,
        id: true
});

const productoModel = model<Producto>('Producto', schemaProducto);

export { productoModel };