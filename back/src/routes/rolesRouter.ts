import {Router} from 'express';
import rolesController from '../controllers/rolesController';

const router = Router();

router.post('/', rolesController.create);
router.get('/', rolesController.getAll);
router.get('/*', rolesController.getOne);
router.delete('/*', rolesController.delete);
router.put('/', rolesController.update);

const rolesRouter = router;
export default rolesRouter;
