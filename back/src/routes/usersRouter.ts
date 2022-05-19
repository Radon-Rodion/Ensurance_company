import {Router} from 'express';
import usersController from '../controllers/usersController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/', usersController.create);
router.get('/', usersController.getAll);
router.delete('/*', usersController.delete);
router.get('/*', usersController.getOne);
router.put('/', usersController.update);

const usersRouter = router;
export default usersRouter;
