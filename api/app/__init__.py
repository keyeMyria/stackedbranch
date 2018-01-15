# app/__init__.py
import json
from flask_api import FlaskAPI, status
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask import request, jsonify, abort, make_response

from flask_graphql import GraphQLView

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

# initialize db
db = SQLAlchemy()

from app.models import Area, LTESighting, SmallCell, Site, SightingsPerHourPerCountry, SightingsNew, SightingsBase, WideSighting
from app.models import Department as DepartmentModel

class Department(SQLAlchemyObjectType):

  class Meta:
     model = DepartmentModel
     interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    node = relay.Node.Field()
    all_employees = SQLAlchemyConnectionField(Department)

def create_app(config_name):

    app = FlaskAPI(__name__, instance_relative_config=True)
    # overriding Werkzeugs built-in password hashing utilities using Bcrypt.
    bcrypt = Bcrypt(app)

    schema = graphene.Schema(query=Query)

    app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

    app.config.from_object(app_config[config_name])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/api/areas/create', methods=['POST'])
    def create_areas():
        # get the access token

        name    = request.data.get('name', '')
        geodata  = request.data.get('geodata', '')
        center_lat  = request.data.get('center_lat')
        center_lng  = request.data.get('center_lng')
        zoom  = request.data.get('zoom')

        area = Area(name=name, geodata=geodata, center_lat=center_lat, center_lng=center_lng, zoom=zoom)
        area.save()
        response = jsonify({
            'id': area.id,
            'name': area.name,
            'geodata': area.geodata,
            'center_lat' : area.center_lat,
            'center_lng' : area.center_lng,
            'zoom' : area.zoom,
            'date_created': area.date_created,
            'date_modified': area.date_modified
        })

        return make_response(response), 201

    @app.route('/api/areas/delete', methods=['POST'])
    def delete_areas():
        # get the access token
        id    = request.data.get('id', 0)
        area = Area.query.filter_by(id=id).first()

        if (area is not None):
          area.delete()

        return make_response(jsonify({'id':id})), 200


    @app.route('/api/sightingsperhour', methods=['GET'])
    def get_sightingsperhour():
      # get all the areas
      sightings   = SightingsPerHourPerCountry.query.all()
      results = []
      for sighting in sightings:
         results.append({'country' : sighting.country, 'hour' : sighting.hour, 'count' : sighting.count})

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/sightingsnew', methods=['POST'])
    def sightingsnew():

      sightings = db.session.query(SightingsBase.site_id, SightingsBase.country, func.count(SightingsBase.roundedtoday))\
                        .filter(SightingsBase.site_id.in_(request.data['selectedRow']))\
                        .filter(SightingsBase.roundedtoday.between(request.data['selectedDates'][0], request.data['selectedDates'][1]))\
                        .group_by(SightingsBase.site_id, SightingsBase.country)\
                        .order_by(SightingsBase.site_id, func.count(SightingsBase.roundedtoday).desc())\

      results = []
      for sighting in sightings.all():
         results.append({'country' : sighting.country, 'site_id' : sighting.site_id, 'count' : sighting[2]})

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/widesightingsnew', methods=['POST', 'GET'])
    def widesightingsnew():

      sightings = db.session.query(WideSighting.site_id, WideSighting.gender, func.count(WideSighting.gender))\
                        .filter(WideSighting.site_id.in_([138, 134]))\
                        .group_by(WideSighting.site_id, WideSighting.gender)

      results = []
      for sighting in sightings.all():
         #gender     = sighting.gender if len(sighting.gender) else 'unknown'
         results.append({'site_id' : sighting.site_id, 'gender' : sighting.gender, 'count' : sighting[2]})

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/widesightings', methods=['GET'])
    def widesightings():

      sightings = WideSighting.get_all()

      results = []
      for sighting in sightings:
         results.append(sighting.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/sites', methods=['GET'])
    def get_sites():
      # get all the areas
      sites   = Site.get_all()
      results = []
      for site in sites:
         results.append(site.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/areas', methods=['GET'])
    def get_areas():
        # get all the areas
        areas         = Area.get_all()
        allSmallCells = SmallCell.get_all()

        results = []

        for area in areas:

            smallcellInArea = []
            for smallcell in allSmallCells:
              smallcellInArea.append(smallcell.serialise())

            obj = {
                'id': area.id,
                'name': area.name,
                'date_created': area.date_created,
                'date_modified': area.date_modified,
                'center_lat' : area.center_lat,
                'center_lng' : area.center_lng,
                'zoom' : area.zoom,
                'geodata': area.geodata,
                'smallcells' : smallcellInArea
            }
            results.append(obj)

        return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/smallcells', methods=['GET'])
    def get_smallcells():
        allSmallCells = SmallCell.query.order_by(SmallCell.id).all()

        results = []
        for smallcell in allSmallCells:
          results.append(smallcell.serialise())

        return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/smallcells/update', methods=['POST'])
    def update_smallcell():
        smallcell_id    = request.data.get('id', '')
        site_id  = request.data.get('site_id', '')

        smallcell = SmallCell.query.filter_by(id=smallcell_id).first()
        smallcell.site_id = site_id
        smallcell.save()

        return make_response(jsonify({ 'smallcell_id' : smallcell.id, 'site_id' : smallcell.site_id })), 200

    @app.route('/api/sighting/byarea/<areaid>', methods=['GET'])
    def get_sighting(areaid):
        import string
        area = Area.query.filter_by(id=areaid).first()
        if area is None : return make_response(jsonify({ 'list' : [] })), 200

        smallcells = []
        for smallcell in SmallCell.get_all():
          if area.contains(smallcell):
            smallcells.append('\'' + smallcell.id + '\'')

        results = []
        if (len(smallcells) > 0):
          for row in db.session.execute('select * from get_sightings(ARRAY[' + ','.join(smallcells) + '])'):
            results.append(({ 'country' : row['__country'], 'network' : row['__network'], 'timestamp' : row['__timestamp'], 'count' : row['__count'] }))

        return make_response(jsonify({ 'list' : results })), 200



    @app.route('/api/sighting/getgender/', methods=['POST'])
    def get_gender():

        site_ids            = str(request.data.get('site_ids', ''))
        from_sighting_date  = request.data.get('selectedDates')[0]
        to_sighting_date    = request.data.get('selectedDates')[1]

        import string

        results = []

        for row in db.session.execute("select * from get_gender(ARRAY[" + site_ids + "]," + "'" + from_sighting_date + "'" + "," + "'" + to_sighting_date + "'" + ")"):
          results.append(({ 'site_id' : row['__site_id'], 'date_month' : row['__date_month'], 'gender' : row['__gender'], 'age_range' : row['__age_range'], 'perc_visits' : row['__perc_visits'], 'scaled_visits' : row['__scaled_visits'] }))

        return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/sighting/getgendertotals/', methods=['POST'])
    def get_gender_totals():

        site_ids            = str(request.data.get('site_ids', ''))
        from_sighting_date  = request.data.get('selectedDates')[0]
        to_sighting_date    = request.data.get('selectedDates')[1]

        import string

        results = []

        for row in db.session.execute("select * from get_gender_totals(ARRAY[" + site_ids + "]," + "'" + from_sighting_date + "'" + "," + "'" + to_sighting_date + "'" + ")"):
          results.append(({ 'site_id' : row['__site_id'],  'gender' : row['__gender'], 'age_range' : row['__age_range'], '__visits' : row['__visits'] }))

        return make_response(jsonify({ 'list' : results })), 200



    @app.route('/api/sighting', methods=['GET'])
    def get_sightings():

        results = []
        for sighting in LTESighting.get_all():
            results.append(sighting.serialise())

        return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/sitescomparison', methods=['POST'])
    def get_sitescomparison():

        sightings = LTESighting.query\
                    .filter(LTESighting.smallcell.has(SmallCell.site_id.in_(request.data['selectedRow'])))\
                    .filter(LTESighting.timestamp.between(request.data['selectedDates'][0], request.data['selectedDates'][1]))

        return make_response(jsonify({ 'list' : [sighting.serialise() for sighting in sightings] })), 200

    @app.route('/api/sighting/bysite', methods=['GET'])
    def get_sightings_by_site():

        site_ids = (request.args.getlist('site_id'))

        results = []
        #should do this better with joins!
        for sighting in LTESighting.query:
            if (str(sighting.smallcell.site_id)) in site_ids : results.append(sighting.serialise())

        return make_response(jsonify({ 'list' : results })), 200

    return app
