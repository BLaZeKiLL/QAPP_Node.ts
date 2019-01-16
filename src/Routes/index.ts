import { GetRouter, Request, Response } from '../App/router';

const router = GetRouter();

router.get('/', (req: Request, res: Response) => {
  res.send('Loading Angular...');
});



export default router;
