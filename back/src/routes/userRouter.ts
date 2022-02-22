import { Router } from 'express';
import userController from '../controllers/UsersController';
const router = Router();

router.post('/',userController.create);
router.get('/', userController.getAll);

const userRouter = router;
export default userRouter;
