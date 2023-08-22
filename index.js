require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// post request
app.post('(api/shorturl', async (req, res) => {
  const bodyUrl = req.body.url
  const urlGen = idgenerator.generate();

  if(!urlVal.isWebUrl(bodyUrl)) {
    res.status(200).json({
      error: 'Invalid URL'
    });
  } else {
    try {
      let findOne = await URL.findOne({
        original_url: bodyUrl
      });

      if(findOne) {
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url
        });

      } else {
        findOne = new Url({
          original_url: findOne.original_url,
          short_url: urlGen
        });

        await findOne.save();

        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url
        });
      }

    } catch (err) {
      res.status(500).json('server error');
    }
  }
});

// get method
app.get('/api/shorturl/:id', async (req, res) => {
  try {
    const urlParams = await Url.findOne({
      short_url: req.params.id
    });

    if(urlParams){
      return res.redirect(urlParams.original_url);
    } else {
      return res.status(404).json('URL not found');
    }
  } catch(err) {
    res.status(500).json('server error');
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
