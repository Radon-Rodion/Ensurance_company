import {Router} from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.post('/', usersController.create);
router.get('/', usersController.getAll);
router.delete('/*', usersController.delete);
router.put('/', usersController.update);

const usersRouter = router;
export default usersRouter;
