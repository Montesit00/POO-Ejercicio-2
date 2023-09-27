import { Inventario } from "../inventario.entity";
import { inventarioModel } from "../inventario.model";
import { inventarioService } from "../inventario.service";

export class inventarioServiceMongo implements inventarioService {

    //defino el modelo
    modelo = inventarioModel;

    //metodos
    async xunidad(id: string): Promise<Inventario | null> {
        try {
            const inventario = await inventarioModel.findById(id);

            if (!inventario) {
                throw new Error('No se encontró el inventario');
            }

            if (inventario.tipoCompra !== 'unidad') {
                throw new Error('Este inventario no es una compra por unidad');
            }

            // Aplica el descuento al total
            inventario.total -= (inventario.total * (inventario.descuento / 100));

            // Actualiza el tipo de compra (si no lo has hecho previamente)
            inventario.tipoCompra = 'unidad';

            // Actualiza el stock
            inventario.cantidad -= 1;

            // Guarda los cambios en la base de datos
            await inventario.save();

            return inventario;
        } catch (error) {
            throw new Error('Error en la compra por unidad');
        }
    }

    async xcantidad(id: string): Promise<Inventario | null> {
        try {
            const inventario = await inventarioModel.findById(id);
    
            if (!inventario) {
                throw new Error('No se encontró el inventario');
            }
    
            if (inventario.tipoCompra !== 'cantidad') {
                throw new Error('Este inventario no es una compra por cantidad');
            }
    
            // Aplica el descuento al total
            inventario.total -= (inventario.total * (inventario.descuento / 100));
    
            // Actualiza el tipo de compra (si no lo has hecho previamente)
            inventario.tipoCompra = 'cantidad';
    
            // Actualiza el stock (en este caso, no se resta 1, ya que es una compra por cantidad)
            inventario.cantidad -= 1;
    
            // Guarda los cambios en la base de datos
            await inventario.save();
    
            return inventario;
        } catch (error) {
            throw new Error('Error en la compra por cantidad ');
        }
    }

    async descuento(id: string, tipoCompra: string, descuento: number): Promise<Inventario | null> {
        try {
            const inventario = await this.modelo.findById(id);
    
            if (!inventario) {
                throw new Error('No se encontró el inventario');
            }
    
            // Aplicamos el descuento al total
            inventario.total -= (inventario.total * (descuento / 100));
    
            // Actualizamos el tipo de compra
            if (tipoCompra === 'cantidad' || tipoCompra === 'unidad') {
                inventario.tipoCompra = tipoCompra;
            } else {
                throw new Error('Tipo de compra no válido');
            }
    
            // Solo actualizamos el stock si se realiza una compra (no afectado por el descuento)
            if (tipoCompra === 'cantidad' || tipoCompra === 'unidad') {
                const cantidad = tipoCompra === 'unidad' ? 1 : inventario.cantidad; // Si es por unidad, resto 1, resto la cantidad comprada
                inventario.cantidad -= cantidad;
            }
    
            // Guardamos los cambios en la base de datos
            await inventario.save();
    
            return inventario;
        } catch (error) {
            throw new Error('Error al aplicar descuentos');
        }
    }

     async total(total: number): Promise<Inventario | null> {
        return null;
    }
}