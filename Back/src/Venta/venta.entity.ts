import { Producto } from "../Producto/producto.entity";

interface ProductItem {
    producto: Producto,
    catidad: number
};

export interface Venta {
    id: string;
    productos: ProductItem[];
    precio_producto:number
    totalVenta:number
};
