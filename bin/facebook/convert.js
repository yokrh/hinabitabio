// Built-in node module
const fs = require('fs');

/** Hinabita Settings */

class Hinabita {
  constructor () {
    this.characters = {
      marika: { id: 'marika', name: 'まり花', comment_name: 'まりか', face: '(*´▽｀)' },
      ibuki: { id: 'ibuki', name: '一舞', comment_name: 'イブ', face: '( *｀ω´)' },
      sakiko: { id: 'sakiko', name: '咲子', comment_name: '咲子', face: '(*^-^*)' },
      meu: { id: 'meu', name: 'めう', comment_name: 'めう', face: '♪(°▽^ *)ノ' },
      rin: { id: 'rin', name: '凛', comment_name: '凛', face: '(ー_ー*川' },
      kokona: { id: 'kokona', name: '心菜', comment_name: 'ここな', face: '(。・ω・。）' },
      natsuhi: { id: 'natsuhi', name: '夏陽', comment_name: '夏陽', face: '(。･｀ω･ )' },
      hinata: { id: 'hinata', name: '日向', comment_name: '日向', face: '(日向)' },
      unknown: { id: 'unknown', name: '???', comment_name: '???', face: '???' },
    };
  }

  getCharacter(message, id) {
    const self = this;
    if (!message) {
      //console.log('Cant find character!! [id] : ', id);
      return self.characters['unknown'];;
    }

    // irregular pattern（イブ）
    if (id == '406971872695820_443278169065190') {
      return self.characters['ibuki'];
    }
    if (id == '406971872695820_446064965453177') {
      return self.characters['ibuki'];
    }
    if (id == '406971872695820_446072878785719') {
      return self.characters['ibuki'];
    }
    if (id == '406971872695820_446088235450850') {
      return self.characters['ibuki'];
    }

    for (let key in self.characters) {
      const c = self.characters[key];
      const front = message.slice(0, 5);
      const back = message.slice(-5);
      if (front.includes(c.comment_name)
        || back.includes(c.comment_name)) {
        return c;
      }
    }

    // irregular pattern（無名）
    if (id == '406971872695820_446089692117371') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_446080452118295') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_446069032119437') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_446031828789824') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_443744695685204') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_304862742951654') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_443273779065629') {
      return self.characters['marika'];
    }

    // irregular pattern（まり花）
    if (id == '406971872695820_1193417904051209') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_987663671293301') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_861522353907434') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_457231657669841') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_444928615566812') {
      return self.characters['marika'];
    }

    // irregular pattern（凜）
    if (id == '406971872695820_757403344319336') {
      return self.characters['marika'];
    }
    if (id == '406971872695820_755147637878240') {
      return self.characters['marika'];
    }

    console.log('Cant find character!! [id] : ', id);
    return self.characters['unknown'];
  }
}


/** MAIN */

const hinabita = new Hinabita();
//fs.writeFile('data/characters.json', JSON.stringify(hinabita.characters));

// create data list
let posts = [];
const originalDataFileNum = 29;  // 29
for (let i=0; i<originalDataFileNum; i++) {
  // read original data file
  const file = `original_data/post${i}.json`;
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  const datas = json.data;
  //console.log(datas);

  for (let data of datas) {
    const character = hinabita.getCharacter(data.message, data.id).id;
    const message = data.message ? data.message.replace(/\r\n/g, '\n') : data.message;
    const hasAttachment = (data.link || data.story) ? true : false;
    const picture = data.full_picture ? data.full_picture : data.picture;
    const facebook = `https://www.facebook.com/hinabitter/posts/${data.id.split('_')[1]}`;
    const time = data.created_time;

    const post = {
      character,
      message,
      hasAttachment,
      picture,
      facebook,
      time
    };
    posts.push(post);
  }
}
// order by time
posts = posts.sort((a, b) => {
  const aDate = new Date(a.time).getTime();
  const bDate = new Date(b.time).getTime();
  return aDate == bDate ? 0 : (aDate < bDate ? -1 : 1);
});
console.log('posts.length : ', posts.length);

// write
const postSizePerFile = 10;
const fileNum = parseInt(posts.length / postSizePerFile) + 1;
for (let i=0; i<fileNum; i++) {
  const begin = i * postSizePerFile;
  const end = (i+1) * postSizePerFile;
  const ps = posts.slice(begin, end);

  const file = `data/post_${i}.json`;
  const data = {
    total: fileNum,
    id: i,
    posts: ps,
  }
  fs.writeFile(file, JSON.stringify(data));
  console.log(file);
}

// write group by date
const postGroup = {};
posts.map((post) => {
  const createdTime = new Date(post.time);
  const year = createdTime.getFullYear();
  let month = createdTime.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month;
  const key = `${year}${month}`;

  // put data in map
  if (postGroup[key]) {
    postGroup[key] = postGroup[key].concat(post);
  } else {
    postGroup[key] = [].concat(post);
  }
})
for (let key in postGroup) {
  const file = `data/post_date_${key}.json`;
  const data = {
    posts: postGroup[key]
  }
  fs.writeFile(file, JSON.stringify(data));
  console.log(file);
}
