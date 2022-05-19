import {Router} from 'express';
import ensuranceRequestsController from '../controllers/ensuranceRequestsController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/',ensuranceRequestsController.create);
router.get('/', ensuranceRequestsController.getAll);
router.delete('/*', ensuranceRequestsController.delete);
router.get('/*', ensuranceRequestsController.getOne);
router.put('/', ensuranceRequestsController.update);

const ensuranceRequestsRouter = router;
export default ensuranceRequestsRouter;
