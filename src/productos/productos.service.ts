import { Injectable, NotFoundException } from '@nestjs/common';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

/**
 * Servicio encargado de gestionar las operaciones de negocio de los productos.
 */

@Injectable()
export class ProductosService {
  private readonly productos: Producto[] = [
    { id: 1, nombre: 'Teclado mecanico', precio: 45.90 },
    { id: 2, nombre: 'Mouse inalambrico', precio: 19.50 },
    { id: 3, nombre: 'Monitor 24 pulgadas', precio: 129.99 },
  ];

  /**
   * Obtiene la lista completa de productos disponibles.
   * @returns Un arreglo con todos los productos.
   */
  findAll(): Producto[] {
    return this.productos;
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param id El ID del producto a buscar.
   * @returns El producto encontrado.
   * @throws NotFoundException Si el producto no es encontrado.
   */
  findOne(id: number): Producto {
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }
}