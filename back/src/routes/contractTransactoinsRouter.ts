import {Router} from 'express';
import contractTransactionsController from '../controllers/contractTransactionsController';

const router = Router();

router.post('/', contractTransactionsController.create);
router.get('/', contractTransactionsController.getAll);
router.delete('/*', contractTransactionsController.delete);
router.put('/', contractTransactionsController.update);

const contractTransactionsRouter = router;
export default contractTransactionsRouter;
