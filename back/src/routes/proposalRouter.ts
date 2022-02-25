import {Router} from 'express';
import proposalController from '../controllers/proposalController';

const router = Router();

router.post('/', proposalController.create);
router.get('/', proposalController.getAll);
router.delete('/*', proposalController.delete);
router.put('/', proposalController.update);

const proposalRouter = router;
export default proposalRouter;
