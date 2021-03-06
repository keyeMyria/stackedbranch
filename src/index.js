import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import './rollbar';
import G2 from '@antv/g2';
// import browserHistory from 'history/createBrowserHistory';
import './index.less';
import router from './router';

// 1. Initialize
const app = dva({
  //history: browserHistory(),
  initialState: {
     },
});

// 2. Plugins
// app.useindex.ht({});

// 3. Register global model
app.model(require('./models/Store/global'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');


