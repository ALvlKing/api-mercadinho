import { prisma } from '../database/prisma';
import { Produto } from '../generated/prisma';

type ProdutoCreateData = Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>;
type ProdutoUpdateData = Partial<Omit<Produto, 'id' | 'createdAt' | 'updatedAt' | 'pacienteId' | 'medicoId'>>;

export const create = async (data: ProdutoCreateData): Promise<Produto> => {
  const { pacienteId, medicoId } = data;
  
  const paciente = await prisma.paciente.findUnique({ where: { id: pacienteId } });
  if (!paciente) throw new Error('Paciente não encontrado');
  
  const medico = await prisma.medico.findUnique({ where: { id: medicoId } });
  if (!medico) throw new Error('Médico não encontrado');

  return prisma.produto.create({
    data: { ...data, dataHora: new Date(data.dataHora) },
  });
};

export const getAll = async () => {
  return prisma.produto.findMany({
    include: {
      paciente: { select: { nome: true, cpf: true } },
      medico: { select: { nome: true, especialidade: true } },
    },
  });
};

export const getById = async (id: number) => {
  return prisma.produto.findUnique({
    where: { id },
    include: { paciente: true, medico: true },
  });
};

export const update = async (id: number, data: ProdutoUpdateData): Promise<Produto> => {
  return prisma.produto.update({
    where: { id },
    data: { ...data, dataHora: data.dataHora ? new Date(data.dataHora) : undefined },
  });
};

export const remove = async (id: number): Promise<Produto> => {
  return prisma.produto.delete({ where: { id } });
};

