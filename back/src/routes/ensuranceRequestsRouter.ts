import {Router} from 'express';
import ensuranceRequestsController from '../controllers/ensuranceRequestsController';

const router = Router();

router.post('/',ensuranceRequestsController.create);
router.get('/', ensuranceRequestsController.getAll);
router.delete('/*', ensuranceRequestsController.delete);
router.put('/', ensuranceRequestsController.update);

const ensuranceRequestsRouter = router;
export default ensuranceRequestsRouter;
