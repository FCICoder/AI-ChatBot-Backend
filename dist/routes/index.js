import { Router } from 'express';
import userRoute from './userRoute.js';
import chatRoute from './chatRoute.js';
const appRouter = Router();
// Endpoint for the root route
appRouter.use('/user', userRoute); //domain/api/v1/user
appRouter.use('/chat', chatRoute); //domain/api/v1/chat
export default appRouter;
//# sourceMappingURL=index.js.map