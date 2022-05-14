import {Router} from 'express';
import proposalController from '../controllers/proposalController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/', proposalController.create);
router.get('/', proposalController.getAll);
router.delete('/*', proposalController.delete);
router.get('/*', proposalController.getOne);
router.put('/', proposalController.update);

const proposalRouter = router;
export default proposalRouter;
