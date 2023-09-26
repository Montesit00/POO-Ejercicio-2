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

    find(id:string):Promise <Producto | null>{
        throw new Error("Error al implementar el metodo");
    };

    async create (product:Producto): Promise<Producto>{
        const nuevoProducto = await this.modelo.create(product)
        return nuevoProducto;
    };

    update(id: string, precio: number, stock: number): Promise<Producto | null> {
        throw new Error('Error al implementar el metodo');
    };

    delete(id: string): Promise<Producto | null> {
        throw new Error('Error al implementar el metodo');
    };
};