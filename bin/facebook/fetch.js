// Built-in node module
const fs = require('fs');
const https = require('https');

// API Settings
const page = 'hinabitter';
const api = 'feed';
const fields = 'created_time,message,link,story,picture,full_picture';
const limit = '100';
const access_token = '';
const uri = `https://graph.facebook.com/v2.8/${page}/${api}?fields=${fields}&limit=${limit}&access_token=${access_token}`;

// Main
const id = 0;
const idMax = 30;
fetchAndWriteJson(uri, 0);

// Fetch recursively
function fetchAndWriteJson(requestUri, id) {
  console.log("id : ", id, "requestUri : ", requestUri);

  const req = https.request(requestUri, (res) => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      // write json
      const json = JSON.parse(body);
      const file = 'original_data/post' + id + '.json'
      fs.writeFileSync(file, JSON.stringify(json));
      console.log("output : ", file);

      // end fetch
      if (!json.paging || id > idMax) {
        return;
      }

      // next fetch
      const nextRequestUri = json.paging.next;
      const nextId = id + 1;
      fetchAndWriteJson(nextRequestUri, nextId);
    });
  })
  req.end();
}
