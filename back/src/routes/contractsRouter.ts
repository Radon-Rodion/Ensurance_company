import {Router} from 'express';
import contractsController from '../controllers/сontractsController';

const router = Router();

router.post('/', contractsController.create);
router.get('/', contractsController.getAll);
router.delete('/*', contractsController.delete);
router.put('/', contractsController.update);

const contractsRouter = router;
export default contractsRouter;
