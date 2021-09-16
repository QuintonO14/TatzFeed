import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

//Get Tats Collection and Convert to Array
handler.get(async (req, res) => {
    await req.db.collection('tats').find().toArray(function (err, docs){
      if(!err) {
        res.json(docs);
      } else {
        res.json(err);
      }
    });
    
});

  export const config = {
    api: {
      bodyParser: {
        sizeLimit: "100mb"
      },
    },
  };
  //Add a new Tattoo
  handler.post(async (req, res) => {
  const body = req.body;
  try {
  const tattoo = await req.db.collection('tats').insertOne(
   body
  )
  } catch (err) {
    console.error(err)
  }

});

export default handler;