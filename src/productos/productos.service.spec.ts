import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producto } from './producto.entity.js';
import { ProductosService } from './productos.service.js';
import { FindOperator } from 'typeorm';

describe('ProductosService', () => {
  let service: ProductosService;
  const repository = {
    find: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosService,
        {
          provide: getRepositoryToken(Producto),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('filtra por coincidencia parcial sin distinguir mayúsculas', async () => {
    repository.find.mockResolvedValue([]);

    await service.findAll('teclado');

    expect(repository.find).toHaveBeenCalledWith({
      where: {
        nombre: expect.objectContaining({
          type: 'ilike',
          value: '%teclado%',
        }),
      },
    });
    expect(repository.find.mock.calls[0][0].where.nombre).toBeInstanceOf(FindOperator);
  });
});
