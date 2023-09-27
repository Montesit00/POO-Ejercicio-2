import { Schema, model } from 'mongoose';
import { Inventario } from './inventario.entity';

const schemaInventario = new Schema<Inventario>({
    tipoCompra:{
        type:String,
        enum: ['unidad', 'cantidad'],
        required:true
    },
    cantidad:{
        type:Number,
        required:true
    },
    descuento:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    productoId:{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    precioUnidad: {
        type: Number,
        required: true
    }
}, {
    timestamps:true,
    id: true
});

const inventarioModel = model<Inventario>('Inventario', schemaInventario);

export { inventarioModel };