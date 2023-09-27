import { Router } from "express";
import { productoService } from "../Producto/producto.service";
import mongoose from "mongoose";

// enrutado los productos
// traigo el servicio de producto
function routerProductos (productoService:productoService){
    //enrutador
    const productRouter = Router();

    //las diferentes rutas
    productRouter.get('/', async (req,res)=>{
        const todoProductos = await productoService.list()
        return res.status(200).json({
                msg:"Estos son todos los productos",
                todoProductos
            })
    });

    productRouter.post('/', async (req,res)=>{
   
        const nuevoProducto = await productoService.create(req.body)
        res.status(201).json({
            msg:'Procto nuevo creado',
            nuevoProducto
        })
    });

    productRouter.put('/', async (req,res)=>{
        const id = req.body.id;
        const { precio, stock } = req.body;

        try {
            const productoUpdate = await productoService.update(id, precio, stock)
            res.status(200).json({
                msg:'producto actualizado',
                productoUpdate
            })
        } catch (error) {
            console.log("clg error ",error);
            return res.status(500).json({
                msg:"Error al actualizar el producto"
            })
        }
    })

    productRouter.delete('/:id', async (req, res) => {
        const {id} = req.params;
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const borrarProducto = await productoService.delete(id);
            res.status(201).json(borrarProducto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
      })

    return productRouter;
}

export { routerProductos };