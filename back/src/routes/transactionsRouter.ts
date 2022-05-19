import {Router} from 'express';
import transactionsController from '../controllers/transactionsController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/',transactionsController.create);
router.get('/', transactionsController.getAll);
router.delete('/*', transactionsController.delete);
router.get('/*', transactionsController.getOne);
router.put('/', transactionsController.update);

const transactionsRouter = router;
export default transactionsRouter;
