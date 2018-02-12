import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Button, Icon} from 'antd';
import ReactSVG from 'react-svg';
import MotionMenu from '../../../ext/react-motion-menu/src';

import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SummaryCard from '../../../components/Store/Attraction/SummaryCard/index';
import ColorThing from '../../../components/Store/Attraction/SummaryCard/ColorThing';

import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';
import HourBar from '../../../components/Store/Attraction/HourBar';
import GenderAge from '../../../components/Store/Attraction/GenderAge';
import DistrictVisitorMap from '../../../components/Store/Attraction/DistrictVisitorMap/DistrictVisitorMap';

@connect(state => {

  return {
    purchase: state.purchase.purchase,
    districtvisitors: state.districtvisitors.visitors,
    attraction_totals: state.districtvisitors.attraction_totals,
  }
})

export default class Attraction extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'districtvisitors/fetch_visitors',
      payload: {}
    });

    dispatch({
      type: 'districtvisitors/fetch_attraction_totals',
      payload: {}
    });
  }

  getGender(feature) {

    const {dispatch} = this.props;

    dispatch({
      type: 'purchase/fetch',
      payload: {'home_district_name' : feature.properties.name, 'type_visitor' : 'Visitor'}
    });
  }

  printDocument() {

    domtoimage.toBlob(document.getElementById('root'))
      .then(function (blob) {
        FileSaver.saveAs(blob, 'attraction_power.png');
      });
  }

  render() {

    const {purchase} = this.props;

    const work_dow_data = [{value : 32.01, text : 'Friday', hour_from : 20, hour_to : 24}, {value : 31.56, text : 'Saturday', hour_from : 16, hour_to : 24}, {value : 38.43, text : 'Sunday', hour_from : 10, hour_to : 20}];

    const pageHeaderContent = (
      <div>

        <div style={{'float' : 'right'}}>
          <CalendarSideBar/>
        </div>

        <div>

          <h1>Overview: Attraction power</h1>
          <small>Know your attraction power from total pedestrians to sales and take a general perspective of target</small>

          {/*TODO put this in a component*/}

          <div style={{'height' : '60px', 'right' : '83px', top : '151px', 'zIndex' : 999, position: 'absolute'}} >

          <MotionMenu
            type="horizontal"
            reverse={true}
            margin={60}
          >
            <div>
              <ReactSVG path={require('../../../assets/svg/plus-blue-button.svg')} />
            </div>

            <div onClick={this.printDocument.bind(this)} style={{'marginTop' : '5px'}}>
              <ReactSVG path={require('../../../assets/svg/share-button.svg')} />
            </div>

            <div onClick={this.printDocument.bind(this)} style={{'marginTop' : '5px'}}>
              <ReactSVG path={require('../../../assets/svg/screen-shot-button.svg')}  />
            </div>

          </MotionMenu>
          </div>


        </div>

      </div>
    );

    return (
      <PageHeaderLayout
        top={null}
        content={pageHeaderContent}
      >

        <Row gutter={24}>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>

            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic_city_store.svg')} /> }
              bordered={false}
              title="Catchment Area (100%)"
              total={this.props.attraction_totals.getValue('Influence area')}
              footer={<ColorThing color='#E90C8B' text={'#ffffff'}>Catchment area (ca)</ColorThing>}
            >

            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic-nearby-camera-store.svg')} /> }
              bordered={false}
              title="Nearby"
              subtitle={this.props.attraction_totals.getValue('Walk bys')}
              total={this.props.attraction_totals.getPercent('Walk bys')}
              footer={<ColorThing color='#477784' text={'#ffffff'}>Concern CA = {this.props.attraction_totals.getDifference('Walk bys')} less</ColorThing>}
            >
            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic-shop-store.svg')} /> }
              bordered={false}
              title="In store"
              subtitle={this.props.attraction_totals.getValue('In Store')}
              total={this.props.attraction_totals.getPercent('In Store')}
              footer={<ColorThing color='#7ED6D6' text={'#ffffff'}>Concern CA = {this.props.attraction_totals.getDifference('In Store')} less</ColorThing>}
            >
            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic-basket-sales-store.svg')} /> }
              bordered={false}
              title="Sales"
              subtitle={this.props.attraction_totals.getValue('Buy')}
              total={this.props.attraction_totals.getPercent('Buy')}
              footer={<ColorThing color={'#BFEAEA'} text={'#4A494A'} >Concern CA = {this.props.attraction_totals.getDifference('Buy')} Less</ColorThing>}
            >
            </SummaryCard>
          </Col>

        </Row>

        <Divider />
        <Row gutter={24}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>

            <Card
              bordered={true}
              title="Home District">

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <DistrictVisitorMap type={'home'} districtClick={ this.getGender.bind(this) } data={this.props.districtvisitors.home.list}></DistrictVisitorMap>
                </Col>
              </Row>

              <Divider/>

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <HourBar data={purchase} width={290}/>
                </Col>
              </Row>

              <Divider/>

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  {(purchase ? <GenderAge data={purchase}/> : <span></span>)}
                </Col>
              </Row>

            </Card>

          </Col>



          <Col xl={12} lg={12} md={24} sm={24} xs={24}>

            <Card
              bordered={true}
              title="Work District">

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <DistrictVisitorMap type={'work'} data={this.props.districtvisitors.work.list}></DistrictVisitorMap>
                </Col>
              </Row>

              <Divider/>

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <HourBar data={purchase} width={290}/>
                </Col>
              </Row>

              <Divider/>

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  {(purchase ? <GenderAge data={purchase}/> : <span></span>)}
                </Col>
              </Row>

            </Card>

          </Col>



        </Row>

      </PageHeaderLayout>
    );
  }
}
