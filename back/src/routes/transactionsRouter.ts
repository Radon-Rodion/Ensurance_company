import {Router} from 'express';
import transactionsController from '../controllers/transactionsController';

const router = Router();

router.post('/',transactionsController.create);
router.get('/', transactionsController.getAll);
router.delete('/*', transactionsController.delete);
router.put('/', transactionsController.update);

const transactionsRouter = router;
export default transactionsRouter;
