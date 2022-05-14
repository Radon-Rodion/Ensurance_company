import {Router} from 'express';
import catalogueController from '../controllers/catalogueController';
import rolesController from "../controllers/rolesController";

const router = Router();

router.post('/', catalogueController.create);
router.get('/', catalogueController.getAll);
router.delete('/*', catalogueController.delete);
router.get('/*', catalogueController.getOne);
router.put('/', catalogueController.update);

const catalogueRouter = router;
export default catalogueRouter;
