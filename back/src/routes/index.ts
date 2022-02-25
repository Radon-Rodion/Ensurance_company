import {Router} from 'express';
import catalogueRouter from './catalogueRouter';
import contractsRouter from './contractsRouter';
import contractTransactoinsRouter from './contractTransactoinsRouter';
import ensuranceRequestsRouter from './ensuranceRequestsRouter';
import proposalRouter from './proposalRouter';
import rolesRouter from './rolesRouter';
import selectedRouter from './selectedRouter';
import transactionsRouter from './transactionsRouter';
import usersRouter from './usersRouter';

const router = Router();
router.use('/catalogue', catalogueRouter);
router.use('/contracts', contractsRouter);
router.use('/contract-transactions', contractTransactoinsRouter);
router.use('/ensurance-requests', ensuranceRequestsRouter);
router.use('/proposal', proposalRouter);
router.use('/roles', rolesRouter);
router.use('/selected', selectedRouter);
router.use('/transactions', transactionsRouter);
router.use('/users', usersRouter);

export default router;
