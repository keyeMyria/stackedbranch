import { fakeChartData } from '../../services/api';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = {'visitData':[{'x':'2017-12-01','y':7},{'x':'2017-12-02','y':5},{'x':'2017-12-03','y':4},{'x':'2017-12-04','y':2},{'x':'2017-12-05','y':4},{'x':'2017-12-06','y':7},{'x':'2017-12-07','y':5},{'x':'2017-12-08','y':6},{'x':'2017-12-09','y':5},{'x':'2017-12-10','y':9},{'x':'2017-12-11','y':6},{'x':'2017-12-12','y':3},{'x':'2017-12-13','y':1},{'x':'2017-12-14','y':5},{'x':'2017-12-15','y':3},{'x':'2017-12-16','y':6},{'x':'2017-12-17','y':5}],'visitData2':[{'x':'2017-12-01','y':1},{'x':'2017-12-02','y':6},{'x':'2017-12-03','y':4},{'x':'2017-12-04','y':8},{'x':'2017-12-05','y':3},{'x':'2017-12-06','y':7},{'x':'2017-12-07','y':2}],'salesData':[{'x':'1月','y':791},{'x':'2月','y':789},{'x':'3月','y':607},{'x':'4月','y':465},{'x':'5月','y':896},{'x':'6月','y':824},{'x':'7月','y':769},{'x':'8月','y':969},{'x':'9月','y':736},{'x':'10月','y':1124},{'x':'11月','y':890},{'x':'12月','y':642}],'searchData':[{'index':1,'keyword':'TEST-0','count':390,'range':58,'status':1},{'index':2,'keyword':'TEST-1','count':719,'range':79,'status':0},{'index':3,'keyword':'TEST-2','count':828,'range':82,'status':0},{'index':4,'keyword':'TEST-3','count':518,'range':24,'status':0},{'index':5,'keyword':'TEST-4','count':50,'range':1,'status':0},{'index':6,'keyword':'TEST-5','count':364,'range':24,'status':1},{'index':7,'keyword':'TEST-6','count':579,'range':42,'status':1},{'index':8,'keyword':'TEST-7','count':264,'range':46,'status':1},{'index':9,'keyword':'TEST-8','count':262,'range':32,'status':0},{'index':10,'keyword':'TEST-9','count':502,'range':48,'status':1},{'index':11,'keyword':'TEST-10','count':833,'range':9,'status':0},{'index':12,'keyword':'TEST-11','count':521,'range':10,'status':1},{'index':13,'keyword':'TEST-12','count':414,'range':29,'status':0},{'index':14,'keyword':'TEST-13','count':264,'range':16,'status':1},{'index':15,'keyword':'TEST-14','count':338,'range':0,'status':1},{'index':16,'keyword':'TEST-15','count':230,'range':22,'status':1},{'index':17,'keyword':'TEST-16','count':159,'range':9,'status':0},{'index':18,'keyword':'TEST-17','count':800,'range':19,'status':0},{'index':19,'keyword':'TEST-18','count':941,'range':49,'status':0},{'index':20,'keyword':'TEST-19','count':119,'range':9,'status':1},{'index':21,'keyword':'TEST-20','count':360,'range':82,'status':1},{'index':22,'keyword':'TEST-21','count':801,'range':77,'status':0},{'index':23,'keyword':'TEST-22','count':801,'range':37,'status':0},{'index':24,'keyword':'TEST-23','count':99,'range':27,'status':1},{'index':25,'keyword':'TEST-24','count':202,'range':8,'status':0},{'index':26,'keyword':'TEST-25','count':0,'range':2,'status':0},{'index':27,'keyword':'TEST-26','count':437,'range':21,'status':0},{'index':28,'keyword':'TEST-27','count':228,'range':50,'status':1},{'index':29,'keyword':'TEST-28','count':932,'range':89,'status':0},{'index':30,'keyword':'TEST-29','count':239,'range':84,'status':0},{'index':31,'keyword':'TEST-30','count':757,'range':75,'status':0},{'index':32,'keyword':'TEST-31','count':10,'range':50,'status':1},{'index':33,'keyword':'TEST-32','count':320,'range':85,'status':0},{'index':34,'keyword':'TEST-33','count':612,'range':67,'status':1},{'index':35,'keyword':'TEST-34','count':179,'range':37,'status':1},{'index':36,'keyword':'TEST-35','count':217,'range':49,'status':0},{'index':37,'keyword':'TEST-36','count':38,'range':19,'status':1},{'index':38,'keyword':'TEST-37','count':894,'range':10,'status':0},{'index':39,'keyword':'TEST-38','count':545,'range':43,'status':0},{'index':40,'keyword':'TEST-39','count':337,'range':98,'status':0},{'index':41,'keyword':'TEST-40','count':976,'range':32,'status':1},{'index':42,'keyword':'TEST-41','count':561,'range':94,'status':1},{'index':43,'keyword':'TEST-42','count':37,'range':81,'status':0},{'index':44,'keyword':'TEST-43','count':169,'range':36,'status':0},{'index':45,'keyword':'TEST-44','count':748,'range':31,'status':1},{'index':46,'keyword':'TEST-45','count':325,'range':3,'status':1},{'index':47,'keyword':'TEST-46','count':201,'range':37,'status':0},{'index':48,'keyword':'TEST-47','count':740,'range':26,'status':1},{'index':49,'keyword':'TEST-48','count':882,'range':71,'status':0},{'index':50,'keyword':'TEST-49','count':745,'range':88,'status':1}],'offlineData':[{'name':'Store 0','cvr':0.4},{'name':'Store 1','cvr':0.5},{'name':'Store 2','cvr':0.1},{'name':'Store 3','cvr':0.3},{'name':'Store 4','cvr':0.5},{'name':'Store 5','cvr':0.6},{'name':'Store 6','cvr':0.8},{'name':'Store 7','cvr':0.2},{'name':'Store 8','cvr':0.8},{'name':'Store 9','cvr':0.9}],'offlineChartData':[{'x':1512136393826,'y1':103,'y2':77},{'x':1512138193826,'y1':40,'y2':59},{'x':1512139993826,'y1':14,'y2':55},{'x':1512141793826,'y1':107,'y2':15},{'x':1512143593826,'y1':82,'y2':29},{'x':1512145393826,'y1':56,'y2':85},{'x':1512147193826,'y1':62,'y2':97},{'x':1512148993826,'y1':59,'y2':71},{'x':1512150793826,'y1':48,'y2':98},{'x':1512152593826,'y1':77,'y2':53},{'x':1512154393826,'y1':56,'y2':54},{'x':1512156193826,'y1':35,'y2':31},{'x':1512157993826,'y1':107,'y2':41},{'x':1512159793826,'y1':43,'y2':15},{'x':1512161593826,'y1':39,'y2':91},{'x':1512163393826,'y1':20,'y2':79},{'x':1512165193826,'y1':17,'y2':56},{'x':1512166993826,'y1':39,'y2':105},{'x':1512168793826,'y1':55,'y2':11},{'x':1512170593826,'y1':28,'y2':42}],'salesTypeData':[{'x':'A','y':4544},{'x':'B','y':3321},{'x':'C','y':3113},{'x':'D','y':2341},{'x':'E','y':1231},{'x':'F','y':1231}],'salesTypeDataOnline':[{'x':'A','y':244},{'x':'B','y':321},{'x':'C','y':311},{'x':'D','y':41},{'x':'E','y':121},{'x':'F','y':111}],'salesTypeDataOffline':[{'x':'A','y':99},{'x':'C','y':188},{'x':'D','y':344},{'x':'E','y':255},{'x':'F','y':65}],'radarData':[{'name':'Radar','label':'引用','value':10},{'name':'Radar','label':'口碑','value':8},{'name':'Radar','label':'产量','value':4},{'name':'Radar','label':'贡献','value':5},{'name':'Radar','label':'热度','value':7},{'name':'团队','label':'引用','value':3},{'name':'团队','label':'口碑','value':9},{'name':'团队','label':'产量','value':6},{'name':'团队','label':'贡献','value':3},{'name':'团队','label':'热度','value':1},{'name':'部门','label':'引用','value':4},{'name':'部门','label':'口碑','value':1},{'name':'部门','label':'产量','value':6},{'name':'部门','label':'贡献','value':5},{'name':'部门','label':'热度','value':7}]}//yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = {'visitData':[{'x':'2017-12-01','y':7},{'x':'2017-12-02','y':5},{'x':'2017-12-03','y':4},{'x':'2017-12-04','y':2},{'x':'2017-12-05','y':4},{'x':'2017-12-06','y':7},{'x':'2017-12-07','y':5},{'x':'2017-12-08','y':6},{'x':'2017-12-09','y':5},{'x':'2017-12-10','y':9},{'x':'2017-12-11','y':6},{'x':'2017-12-12','y':3},{'x':'2017-12-13','y':1},{'x':'2017-12-14','y':5},{'x':'2017-12-15','y':3},{'x':'2017-12-16','y':6},{'x':'2017-12-17','y':5}],'visitData2':[{'x':'2017-12-01','y':1},{'x':'2017-12-02','y':6},{'x':'2017-12-03','y':4},{'x':'2017-12-04','y':8},{'x':'2017-12-05','y':3},{'x':'2017-12-06','y':7},{'x':'2017-12-07','y':2}],'salesData':[{'x':'1月','y':791},{'x':'2月','y':789},{'x':'3月','y':607},{'x':'4月','y':465},{'x':'5月','y':896},{'x':'6月','y':824},{'x':'7月','y':769},{'x':'8月','y':969},{'x':'9月','y':736},{'x':'10月','y':1124},{'x':'11月','y':890},{'x':'12月','y':642}],'searchData':[{'index':1,'keyword':'TEST-0','count':390,'range':58,'status':1},{'index':2,'keyword':'TEST-1','count':719,'range':79,'status':0},{'index':3,'keyword':'TEST-2','count':828,'range':82,'status':0},{'index':4,'keyword':'TEST-3','count':518,'range':24,'status':0},{'index':5,'keyword':'TEST-4','count':50,'range':1,'status':0},{'index':6,'keyword':'TEST-5','count':364,'range':24,'status':1},{'index':7,'keyword':'TEST-6','count':579,'range':42,'status':1},{'index':8,'keyword':'TEST-7','count':264,'range':46,'status':1},{'index':9,'keyword':'TEST-8','count':262,'range':32,'status':0},{'index':10,'keyword':'TEST-9','count':502,'range':48,'status':1},{'index':11,'keyword':'TEST-10','count':833,'range':9,'status':0},{'index':12,'keyword':'TEST-11','count':521,'range':10,'status':1},{'index':13,'keyword':'TEST-12','count':414,'range':29,'status':0},{'index':14,'keyword':'TEST-13','count':264,'range':16,'status':1},{'index':15,'keyword':'TEST-14','count':338,'range':0,'status':1},{'index':16,'keyword':'TEST-15','count':230,'range':22,'status':1},{'index':17,'keyword':'TEST-16','count':159,'range':9,'status':0},{'index':18,'keyword':'TEST-17','count':800,'range':19,'status':0},{'index':19,'keyword':'TEST-18','count':941,'range':49,'status':0},{'index':20,'keyword':'TEST-19','count':119,'range':9,'status':1},{'index':21,'keyword':'TEST-20','count':360,'range':82,'status':1},{'index':22,'keyword':'TEST-21','count':801,'range':77,'status':0},{'index':23,'keyword':'TEST-22','count':801,'range':37,'status':0},{'index':24,'keyword':'TEST-23','count':99,'range':27,'status':1},{'index':25,'keyword':'TEST-24','count':202,'range':8,'status':0},{'index':26,'keyword':'TEST-25','count':0,'range':2,'status':0},{'index':27,'keyword':'TEST-26','count':437,'range':21,'status':0},{'index':28,'keyword':'TEST-27','count':228,'range':50,'status':1},{'index':29,'keyword':'TEST-28','count':932,'range':89,'status':0},{'index':30,'keyword':'TEST-29','count':239,'range':84,'status':0},{'index':31,'keyword':'TEST-30','count':757,'range':75,'status':0},{'index':32,'keyword':'TEST-31','count':10,'range':50,'status':1},{'index':33,'keyword':'TEST-32','count':320,'range':85,'status':0},{'index':34,'keyword':'TEST-33','count':612,'range':67,'status':1},{'index':35,'keyword':'TEST-34','count':179,'range':37,'status':1},{'index':36,'keyword':'TEST-35','count':217,'range':49,'status':0},{'index':37,'keyword':'TEST-36','count':38,'range':19,'status':1},{'index':38,'keyword':'TEST-37','count':894,'range':10,'status':0},{'index':39,'keyword':'TEST-38','count':545,'range':43,'status':0},{'index':40,'keyword':'TEST-39','count':337,'range':98,'status':0},{'index':41,'keyword':'TEST-40','count':976,'range':32,'status':1},{'index':42,'keyword':'TEST-41','count':561,'range':94,'status':1},{'index':43,'keyword':'TEST-42','count':37,'range':81,'status':0},{'index':44,'keyword':'TEST-43','count':169,'range':36,'status':0},{'index':45,'keyword':'TEST-44','count':748,'range':31,'status':1},{'index':46,'keyword':'TEST-45','count':325,'range':3,'status':1},{'index':47,'keyword':'TEST-46','count':201,'range':37,'status':0},{'index':48,'keyword':'TEST-47','count':740,'range':26,'status':1},{'index':49,'keyword':'TEST-48','count':882,'range':71,'status':0},{'index':50,'keyword':'TEST-49','count':745,'range':88,'status':1}],'offlineData':[{'name':'Store 0','cvr':0.4},{'name':'Store 1','cvr':0.5},{'name':'Store 2','cvr':0.1},{'name':'Store 3','cvr':0.3},{'name':'Store 4','cvr':0.5},{'name':'Store 5','cvr':0.6},{'name':'Store 6','cvr':0.8},{'name':'Store 7','cvr':0.2},{'name':'Store 8','cvr':0.8},{'name':'Store 9','cvr':0.9}],'offlineChartData':[{'x':1512136393826,'y1':103,'y2':77},{'x':1512138193826,'y1':40,'y2':59},{'x':1512139993826,'y1':14,'y2':55},{'x':1512141793826,'y1':107,'y2':15},{'x':1512143593826,'y1':82,'y2':29},{'x':1512145393826,'y1':56,'y2':85},{'x':1512147193826,'y1':62,'y2':97},{'x':1512148993826,'y1':59,'y2':71},{'x':1512150793826,'y1':48,'y2':98},{'x':1512152593826,'y1':77,'y2':53},{'x':1512154393826,'y1':56,'y2':54},{'x':1512156193826,'y1':35,'y2':31},{'x':1512157993826,'y1':107,'y2':41},{'x':1512159793826,'y1':43,'y2':15},{'x':1512161593826,'y1':39,'y2':91},{'x':1512163393826,'y1':20,'y2':79},{'x':1512165193826,'y1':17,'y2':56},{'x':1512166993826,'y1':39,'y2':105},{'x':1512168793826,'y1':55,'y2':11},{'x':1512170593826,'y1':28,'y2':42}],'salesTypeData':[{'x':'A','y':4544},{'x':'B','y':3321},{'x':'C','y':3113},{'x':'D','y':2341},{'x':'E','y':1231},{'x':'F','y':1231}],'salesTypeDataOnline':[{'x':'A','y':244},{'x':'B','y':321},{'x':'C','y':311},{'x':'D','y':41},{'x':'E','y':121},{'x':'F','y':111}],'salesTypeDataOffline':[{'x':'A','y':99},{'x':'C','y':188},{'x':'D','y':344},{'x':'E','y':255},{'x':'F','y':65}],'radarData':[{'name':'Radar','label':'引用','value':10},{'name':'Radar','label':'口碑','value':8},{'name':'Radar','label':'产量','value':4},{'name':'Radar','label':'贡献','value':5},{'name':'Radar','label':'热度','value':7},{'name':'团队','label':'引用','value':3},{'name':'团队','label':'口碑','value':9},{'name':'团队','label':'产量','value':6},{'name':'团队','label':'贡献','value':3},{'name':'团队','label':'热度','value':1},{'name':'部门','label':'引用','value':4},{'name':'部门','label':'口碑','value':1},{'name':'部门','label':'产量','value':6},{'name':'部门','label':'贡献','value':5},{'name':'部门','label':'热度','value':7}]} //yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setter(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};