import {Router} from 'express';
import selectedController from '../controllers/selectedController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/',authMiddleWare, selectedController.create);
router.get('/',authMiddleWare, selectedController.getAll);
router.delete('/*',authMiddleWare, selectedController.delete);
router.get('/*', authMiddleWare,selectedController.getOne);
router.put('/', authMiddleWare,selectedController.update);

const selectedRouter = router;
export default selectedRouter;
