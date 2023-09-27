import { Venta } from "../Venta/venta.entity";

export interface VentaService{
    list(): Promise<Venta[]>;
    find(id: string): Promise<Venta | null>
    create(productos: string,cantidad:number,precio:number,totalVenta:number): Promise<Venta | null>
    update(id: string,productos: string,cantidad:number, precio:number,totalVenta:number): Promise<Venta | null>
}