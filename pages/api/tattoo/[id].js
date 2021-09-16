import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const idHandler = nextConnect();

idHandler.use(middleware);

//Increases likes in database for selected Object
idHandler.put(async (req, res) => {
if(req.method === 'PUT') {
const id = req.body.id;
const payload = req.body.payload
await req.db.collection('tats').findOneAndUpdate(
  {_id : ObjectID(id)},
  { $inc : { likes: payload}},
    );
  }
  res.send(201)
});

//Increases wants in database for selected Object
idHandler.patch(async (req, res) => {
  if(req.method === 'PATCH') {
    const id = req.body.id;
    const payload = req.body.payload
    await req.db.collection('tats').findOneAndUpdate(
      {_id : ObjectID(id)},
      { $inc : { wants: payload}} 
      );
  }
  res.send(201);
})

export default idHandler;