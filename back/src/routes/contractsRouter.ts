import {Router} from 'express';
import contractsController from '../controllers/сontractsController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/', authMiddleWare, contractsController.create);
router.get('/',authMiddleWare, contractsController.getAll);
router.delete('/*',authMiddleWare, contractsController.delete);
router.get('/*',authMiddleWare, contractsController.getOne);
router.put('/', authMiddleWare,contractsController.update);

const contractsRouter = router;
export default contractsRouter;
