import {Router} from 'express';
import ensuranceRequestsController from '../controllers/ensuranceRequestsController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/',authMiddleWare,ensuranceRequestsController.create);
router.get('/', authMiddleWare,ensuranceRequestsController.getAll);
router.delete('/*',authMiddleWare, ensuranceRequestsController.delete);
router.get('/*', authMiddleWare,ensuranceRequestsController.getOne);
router.put('/',authMiddleWare, ensuranceRequestsController.update);

const ensuranceRequestsRouter = router;
export default ensuranceRequestsRouter;
