import {Router} from 'express';
import catalogueController from '../controllers/catalogueController';

const router = Router();

router.post('/', catalogueController.create);
router.get('/', catalogueController.getAll);
router.delete('/*', catalogueController.delete);
router.put('/', catalogueController.update);

const catalogueRouter = router;
export default catalogueRouter;
