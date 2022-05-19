import {Router} from 'express';
import catalogueController from '../controllers/catalogueController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/',checkRoleMiddleware(1), catalogueController.create);
router.get('/',authMiddleWare, catalogueController.getAll);
router.delete('/*',checkRoleMiddleware(1), catalogueController.delete);
router.get('/*',authMiddleWare, catalogueController.getOne);
router.put('/',checkRoleMiddleware(1), catalogueController.update);

const catalogueRouter = router;
export default catalogueRouter;
