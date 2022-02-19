import { Router } from 'express';
// import catalogueRouter from './CatalogueRouter';
// import contractsRouter from './ContractsRouter';
// import contractTransactoinsRouter from './ContractTransactoinsRouter';
// import ensuranceRequestsRouter from './EnsuranceRequestsRouter';
// import proposalRouter from './ProposalRouter';
// import rolesRouter from './RolesRouter';
// import selectedRouter from './SelectedRouter';
// import transactionsRouter from './TransactionsRouter';
import userRouter from './UserRouter';

const router = Router();
// router.use('/catalogue', catalogueRouter);
// router.use('/contracts', contractsRouter);
// router.use('/contract-transactions', contractTransactoinsRouter);
// router.use('/ensurance-requests', ensuranceRequestsRouter);
// router.use('/proposal', proposalRouter);
// router.use('/roles', rolesRouter);
// router.use('/selected', selectedRouter);
// router.use('/transactions', transactionsRouter);
router.use('/users', userRouter);

export default router;
