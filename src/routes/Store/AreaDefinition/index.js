import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from "dva";

import {Table, Alert, Badge, Divider, Button, Modal, Card, Form, Input} from 'antd';

import { Map, FeatureGroup, TileLayer } from 'react-leaflet';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import AreaDefinitionMapThumbnail from '../../../components/Store/Areas/Definition/AreaDefinitionMapThumbnail';
import AreaDefinitionMapToolbar from '../../../components/Store/Areas/Definition/AreaDefinitionMapToolbar';


const FormItem = Form.Item;

@connect(state => ({
  area: state.area,
}))

class AreaDefinitionTable extends PureComponent {

  state = {
    layers : [1],
    visible: false,
    confirmLoading: false,
    payload: {id : undefined, name : undefined, geodata : null},
  }

  showModal = () => {

    this.clearLayers();

    this.setState({
      payload: {id : undefined, name : undefined, geojson : undefined},
      visible: true,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'area/fetch',
    });
  }

  handleOk = () => {
    const { dispatch } = this.props;

    this.setState({
      visible: false,
      confirmLoading: true,
    });

    this.setState({layers: []});

    dispatch({
      type: 'area/saveandfetch',
      payload: this.state.payload,
    });

    this.setState({ payload: {} });

  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  onAreaDefine = (layer) => {

    this.setState({
      payload: {
        ...this.state.payload,
        geodata: layer.layer.toGeoJSON(),
        zoom: layer.layer._map._zoom,
        center_lat: layer.layer.getCenter().lat,
        center_lng: layer.layer.getCenter().lng
      },
    });
  }

  onNameChange = (event) => {

    console.log(this.state);

    this.setState({ payload: { ...this.state.payload, name: event.target.value }});
  }

  onTheDelete = (id) => {

    const { dispatch } = this.props;

    /*We have to use the callback of setState here as otherwise state might not have beene updated? IS THIS RIGHT?!?!*/
    //why are you bothering with state at all here - could just create payloasd object from scratch!?!?!?
    this.setState({
      payload: {
        id : id
      },
    }, function() {
      dispatch({
        type: 'area/deleteandfetch',
        payload: this.state.payload,
      });
    });
  }

  clearLayers = () => {
    //TODO this almost certainly is not the best way to do this
    if (this.map) (this.map.editcontrol.context.layerContainer.clearLayers());
  }

  layerref = {};

  mapOptions = {
    center: [51.545, -0.01],
    zoom: 10,
    maxZoom: 18,
    minZoom: 1,
    zoomControl: true,
    width: 100
  };

  render() {
    const { areas: { list }, loading } = this.props.area;
    const { visible, confirmLoading } = this.state;

    const columns = [

      {
        title: 'Name',
        dataIndex: 'name',
      },

      {
        render: (area) => {
          return <AreaDefinitionMapThumbnail
                        zoom={area.zoom}
                        geodata={area.geodata}
                        center_lat={area.center_lat}
                        center_lng={area.center_lng}/>
        },
      },

      {
        align: 'right',
        render: (area) => {
          return (<Button type="primary" icon="delete" onClick={x => {return this.onTheDelete.bind(this)(area.id)}} >Delete area</Button>);
        },
      },

    ];

    return (
      <div>

        <PageHeaderLayout>
          <Card bordered={false}>
            <div>

              <div style={{marginBottom: '16px'}}>
                <Button type="primary" onClick={this.showModal}>Create New Area</Button>
              </div>

              <Table
                rowKey={x => x.id}
                loading={loading}
                dataSource={list}
                columns={columns}
                pagination={false}
              />
            </div>
          </Card>

          <Modal title="Create new Area by drawing a shape"
                 visible={visible}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleCancel}
                 footer={[
                   <Button key="submit" type="primary" loading={loading} onClick={this.handleOk.bind(this)}
                           disabled={!this.state.payload.name || !this.state.payload.geodata}>
                     Submit
                   </Button>,
                 ]}
          >

            <FormItem
              labelCol={{span: 3}}
              wrapperCol={{span: 24}}
              label="Name"
            >
              <Input placeholder="Area Name" onChange={this.onNameChange.bind(this)} value={this.state.payload.name}/>
            </FormItem>

            <Map {...this.mapOptions}>
              <FeatureGroup>
                <AreaDefinitionMapToolbar
                  ref={Map => this.map = Map}
                  onAreaDefine={this.onAreaDefine}></AreaDefinitionMapToolbar>
              </FeatureGroup>

              <TileLayer url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
            </Map>
          </Modal>

        </PageHeaderLayout>
      </div>

    );
  }
}

export default AreaDefinitionTable;
