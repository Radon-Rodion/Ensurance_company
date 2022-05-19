import {Router} from 'express';
import usersController from '../controllers/usersController';
import rolesController from "../controllers/rolesController";
const  authMiddleWare=require('../middleware/authMiddleware')
const  checkRoleMiddleware=require('../middleware/checkRoleMiddleware')


const router = Router();


router.get('/',checkRoleMiddleware(1), usersController.getAll);
router.delete('/*', checkRoleMiddleware(1), usersController.delete);
router.get('/*', authMiddleWare, usersController.getOne);
router.put('/',authMiddleWare, usersController.update);
router.post('/registration', usersController.registration);
router.post('/login', usersController.login);


const usersRouter = router;
export default usersRouter;
