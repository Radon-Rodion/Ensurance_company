import {Router} from 'express';
import transactionsController from '../controllers/transactionsController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/',authMiddleWare,transactionsController.create);
router.get('/', checkRoleMiddleware(1),transactionsController.getAll);
router.delete('/*',checkRoleMiddleware(1), transactionsController.delete);
router.get('/*',checkRoleMiddleware(1), transactionsController.getOne);
router.put('/', checkRoleMiddleware(1),transactionsController.update);

const transactionsRouter = router;
export default transactionsRouter;
