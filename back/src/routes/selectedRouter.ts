import {Router} from 'express';
import selectedController from '../controllers/selectedController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/', selectedController.create);
router.get('/', selectedController.getAll);
router.delete('/*', selectedController.delete);
router.get('/*', selectedController.getOne);
router.put('/', selectedController.update);

const selectedRouter = router;
export default selectedRouter;
