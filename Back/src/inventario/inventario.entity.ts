export interface Inventario {
    tipoCompra: 'unidad' | 'cantidad';
    cantidad: number;
    descuento: number;
    total: number;
    productoId: object;
    precioUnidad: number;
};