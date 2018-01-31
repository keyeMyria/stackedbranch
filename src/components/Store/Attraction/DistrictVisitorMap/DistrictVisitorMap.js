import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Choropleth from '../../../Common/Mapping/Choropleth';
import Leaflet from 'leaflet';
import * as topojson from 'topojson';
import { Slider, Switch } from 'antd';

var districts = require('json!./madrid_districts.geo.json');

class RegionChooserMap extends PureComponent {

  state = {};

  render() {

    const {data} = this.props

    const style = {
      fillColor: '#000000',
      weight: 2,
      opacity: 0.5,
      color: 'black',
      fillOpacity: 0.5,
    }

    console.log(data);

    return (
      <div>

        <Map ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={10} style={{'height': '300px'}}>

          <TileLayer opacity={0.8} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          <Choropleth
                      data={districts}
                      valueProperty={(feature) => { const match =  data.find((x) => x.district_name === feature.properties.name); return match ? match.visitors : 0}}

           scale={['lightgreen', 'darkgreen']}
           steps={20}
           style={style}
           mode='e'
           />


        </Map>
      </div>
    );
  }
}

export default RegionChooserMap;







