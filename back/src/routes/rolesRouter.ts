import {Router} from 'express';
import rolesController from '../controllers/rolesController';
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')

const router = Router();

router.post('/',checkRoleMiddleware(1), rolesController.create);
router.get('/', checkRoleMiddleware(1),rolesController.getAll);
router.get('/*', checkRoleMiddleware(1),rolesController.getOne);
router.delete('/*',checkRoleMiddleware(1), rolesController.delete);
router.put('/',checkRoleMiddleware(1), rolesController.update);

const rolesRouter = router;
export default rolesRouter;
