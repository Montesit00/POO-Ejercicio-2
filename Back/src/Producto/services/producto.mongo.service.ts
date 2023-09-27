import { Producto } from "../../Producto/producto.entity";
import { productoModel } from "../producto.model";
import { productoService } from "../producto.service";
    
export class productoServiceMongo implements productoService {
    //defino el modelo
    modelo = productoModel;

    //metodos
    list():Promise <Producto[]>{
        return this.modelo.find()
    };

    async create (product:Producto): Promise<Producto>{
        const nuevoProducto = await this.modelo.create(product)
        return nuevoProducto;
    };

    async update(id: string, precio: number, stock: number): Promise<Producto | null> {
        try {
            const productoActualizado = await this.modelo.findByIdAndUpdate(id, {
                precio: precio,
                stock: stock
            }, { new: true });

            if (productoActualizado) {
                return productoActualizado;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Error al actualizar el producto`);
        }
    };

    async delete(id: string): Promise<Producto | null> {
        try {
            const productoEliminado = await this.modelo.findByIdAndDelete(id);

            if (productoEliminado) {
                return productoEliminado;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Error al eliminar el producto`);
        }
    };
};