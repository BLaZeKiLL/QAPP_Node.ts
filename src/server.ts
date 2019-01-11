import { App } from './App/app';
import { Log } from './Modules/logger';

const app = new App(3000, 'QAPP');

app.listen(() => {
  Log.main.info('HOME - ' + app.getLocalUrl());
  Log.main.info('GRAPHiQL - ' + app.getLocalUrl() + 'graphql/');
  Log.main.info('IP - ' + app.getIP());
});

export default app;
