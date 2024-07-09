import { Router } from 'express';
import userRoute from './userRoute.js';
const appRouter = Router();
// Endpoint for the root route
appRouter.use('/user', userRoute); //domain/api/v1/user
appRouter.use('/chats', userRoute); //domain/api/v1/chats
export default appRouter;
//# sourceMappingURL=index.js.map