import { Router, Request, Response, NextFunction } from 'express';

/**
 * Wraps and Exports the express Router
 */
function GetRouter(): Router {
  return Router();
}

export {
  GetRouter,
  Request,
  Response,
  NextFunction
};
