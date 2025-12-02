import { Request, Response } from "express";
import { createProductSchema } from "../schema";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = createProductSchema.parse(req.body);

    const product = await prisma.product.create({
      data: validatedData,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Inválido ou erro no banco de dados" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro em procurar produtos" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const validatedData = createProductSchema.partial().parse(req.body);

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: Object.fromEntries(
        Object.entries(validatedData).filter(([, value]) => value !== undefined)
      ),
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Inválido ou erro no banco de dados" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
};
