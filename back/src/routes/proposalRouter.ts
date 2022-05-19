import {Router} from 'express';
import proposalController from '../controllers/proposalController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/',checkRoleMiddleware(1), proposalController.create);
router.get('/',checkRoleMiddleware(1), proposalController.getAll);
router.delete('/*',checkRoleMiddleware(1), proposalController.delete);
router.get('/*',checkRoleMiddleware(1), proposalController.getOne);
router.put('/',checkRoleMiddleware(1), proposalController.update);

const proposalRouter = router;
export default proposalRouter;
