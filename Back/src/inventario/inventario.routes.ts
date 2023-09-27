import { Router } from "express";
import { inventarioService } from "./inventario.service";

function routerInventario (inventarioService:inventarioService){
    
    const invetariRouter = Router()

    //compra por unidad o cantidad
    invetariRouter.post('/', async (req, res) => {
        const { id, tipoCompra } = req.body;
        try {
            let venta;
    
            if (tipoCompra === 'unidad') {
                venta = await inventarioService.xunidad(id);
            } else if (tipoCompra === 'cantidad') {
                venta = await inventarioService.xcantidad(id);
            } else {
                return res.status(400).json({ message: 'Tipo de compra no válido' });
            }
    
            if (!venta) {
                return res.status(404).json({ message: 'No se encontró la venta' });
            }
    
            return res.status(200).json({
                msg: `Venta por ${tipoCompra}`,
                venta
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener la venta' });
        }
    })

    //descuento al stock 
    invetariRouter.post('/', async (req, res) => {
        const { id, tipoCompra, descuento } = req.body;
        try {
            const venta = await inventarioService.descuento(id, tipoCompra, descuento);
            res.json({ msg: 'Descuentos aplicados', venta });
        } catch (error) {
            res.status(500).json({ message: 'Error al aplicar descuentos' });
        }
    })
}

export { routerInventario }