import { Router } from "express";
import { VentaService } from '../Venta/venta.service';
import mongoose from "mongoose";
import { productoModel } from '../Producto/producto.model'

function RouterVenta(ventaService: VentaService) {
    const ventaRouter = Router();

    // rutas
    ventaRouter.get('/', async (req, res) => {
        const allVentas = await ventaService.list()
        res.status(200).json(allVentas)
    })

    ventaRouter.get('/buscar', async (req, res) => {
        const id = req.header('idHeader') || ''
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);

            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }

            const buscarVenta = await ventaService.find(id);
            res.status(201).json(buscarVenta);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    ventaRouter.post('/crear', async (req, res) => {

        const { productos } = req.body
        
        for (const producto of productos) {

            const productoEncontrado = await productoModel.findById(producto.producto)

            const thisStock = productoEncontrado?.stock ?? 0
            
            if(thisStock < producto.cantidad){
                return res.status(400).json({})
            } 
                await productoEncontrado?.updateOne({
                    stock: thisStock - producto.cantidad
            })
            return res.status(200).json({})
        }
        res.status(201).json({})
    })

    return ventaRouter
}

export { RouterVenta } 
