import { Router } from "express";
import {
  createProduto,
  getAllProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto,
} from "../controllers/produtoController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createProdutoSchema,
  updateProdutoSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de Produtos
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
// cria um novo produto
router.post("/produtos", validateBody(createProdutoSchema), createProduto);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       500:
 *         description: Erro interno do servidor
 */
// retorna todos os produtos
router.get("/produtos", getAllProdutos);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
// retorna um produto pelo id
router.get("/produtos/:id", validateParams(idParamSchema), getProdutoById);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
// atualiza um produto
router.put(
  "/produtos/:id",
  validateParams(idParamSchema),
  validateBody(updateProdutoSchema),
  updateProduto
);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
// deleta um produto
router.delete("/produtos/:id", validateParams(idParamSchema), deleteProduto);

export default router;
