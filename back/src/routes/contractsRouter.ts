import {Router} from 'express';
import contractsController from '../controllers/сontractsController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/', contractsController.create);
router.get('/', contractsController.getAll);
router.delete('/*', contractsController.delete);
router.get('/*', contractsController.getOne);
router.put('/', contractsController.update);

const contractsRouter = router;
export default contractsRouter;
