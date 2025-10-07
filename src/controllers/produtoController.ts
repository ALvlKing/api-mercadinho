import { Request, Response } from 'express';
import * as produtoService from '../services/produtoService';

export const createProduto = async (req: Request, res: Response) => {
  try {
    const produto = await produtoService.create(req.body);
    return res.status(201).json(produto);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await produtoService.getAll();
    return res.json(produtos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProdutoById = async (req: Request, res: Response) => {
  try {
    const produto = await produtoService.getById(Number(req.params.id));
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });
    return res.json(produto);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  try {
    const produto = await produtoService.update(Number(req.params.id), req.body);
    return res.json(produto);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Produto não encontrado.' });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  try {
    await produtoService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Produto não encontrado.' });
    return res.status(500).json({ message: error.message });
  }
};
