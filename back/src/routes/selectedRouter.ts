import {Router} from 'express';
import selectedController from '../controllers/selectedController';

const router = Router();

router.post('/', selectedController.create);
router.get('/', selectedController.getAll);
router.delete('/*', selectedController.delete);
router.put('/', selectedController.update);

const selectedRouter = router;
export default selectedRouter;
