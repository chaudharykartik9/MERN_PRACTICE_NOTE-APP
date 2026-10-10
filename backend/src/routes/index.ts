import { Router } from "express";
import { authRoute } from "./auth.routes.js";

const rootroute = Router() ;


rootroute.use('/auth' ,authRoute);
 //rootroute.use('/todos' , todoRoute) ;



export { rootroute };
