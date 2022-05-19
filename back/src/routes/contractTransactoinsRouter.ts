import {Router} from 'express';
import contractTransactionsController from '../controllers/contractTransactionsController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/', checkRoleMiddleware(1), contractTransactionsController.create);
router.get('/', checkRoleMiddleware(1), contractTransactionsController.getAll);
router.delete('/*', checkRoleMiddleware(1), contractTransactionsController.delete);
router.get('/*', checkRoleMiddleware(1), contractTransactionsController.getOne);
router.put('/', checkRoleMiddleware(1), contractTransactionsController.update);

const contractTransactionsRouter = router;
export default contractTransactionsRouter;
