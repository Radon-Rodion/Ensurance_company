import {Router} from 'express';
import contractTransactionsController from '../controllers/contractTransactionsController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/', contractTransactionsController.create);
router.get('/', contractTransactionsController.getAll);
router.delete('/*', contractTransactionsController.delete);
router.get('/*', contractTransactionsController.getOne);
router.put('/', contractTransactionsController.update);

const contractTransactionsRouter = router;
export default contractTransactionsRouter;
