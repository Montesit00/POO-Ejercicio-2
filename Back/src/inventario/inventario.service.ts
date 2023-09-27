import { Inventario } from "./inventario.entity";

export interface inventarioService {
    xunidad(id: string): Promise<Inventario | null>;
    xcantidad(id: string): Promise<Inventario | null>;
    descuento(id:string,tipoCompra:string,descuento: number): Promise<Inventario | null>;
    total(total: number): Promise<Inventario | null>;
}
