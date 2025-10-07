import { Router } from 'express';
import clienteRoutes from './clienteRoutes';
import produtoRoutes from './produtoRoutes';

const routes = Router();

routes.use(clienteRoutes);
routes.use(produtoRoutes);

export default routes;
