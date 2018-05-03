<template>
  <div id="top-page" style="margin:0 auto; width:980px; padding-bottom:60px; background-color:#621117;">
    <!-- タイトル -->
    <h1 class="page-title" style="text-align:center; padding:48px 0; letter-spacing: -6px; text-shadow:1px 1px 1px #fff, 1px -1px 1px #fff, -1px 1px 1px #fff, -1px -1px 1px #FFF;">
      <span style="color:#5b2f18; font-size:48px; font-size:8.4vw; vertical-align: middle;">日</span>
      <span style="color:#aa1818; font-size:36px; font-size:5.8vw; vertical-align: middle;">向</span>
      <span style="color:#aa1818; font-size:36px; font-size:5.8vw; vertical-align: middle;">美</span>
      <span style="color:#5b2f18; font-size:40px; font-size:6.6vw; vertical-align: middle;">ビ</span>
      <span style="color:#aa1818; font-size:36px; font-size:5vw; vertical-align: middle;">タ</span>
      <span style="color:#aa1818; font-size:36px; font-size:5vw; vertical-align: middle;">ー</span>
      <span style="color:#5b2f18; font-size:44px; font-size:7.4vw; vertical-align: middle;">ス</span>
      <span style="color:#aa1818; font-size:36px; font-size:5.8vw; vertical-align: middle;">イ</span>
      <span style="color:#aa1818; font-size:36px; font-size:5.8vw; vertical-align: middle;">ー</span>
      <span style="color:#5b2f18; font-size:40px; font-size:6.4vw; vertical-align: middle;">ツ</span>
      <span style="color:#aa1818; font-size:40px; font-size:6vw; vertical-align: middle;">♪</span>
      <span style="padding:4px; color:#fff; font-size:30px; font-size:3vw; vertical-align:bottom; letter-spacing:0; text-shadow:1px 1px 1px #aa1818, 1px -1px 1px #aa1818, -1px 1px 1px #aa1818, -1px -1px 1px #aa1818;">BIOGRAPHY</span>
    </h1>

    <!-- 投稿 -->
    <div class="post-container" style="display:inline-block; vertical-align:top; width:60%; padding:0 5%;">
      <ul>
        <li class="post" v-for="p in posts" :key="p.time" style="padding-bottom:60px;">
          <dl :style="{ 'padding':'12px 4%', 'background-color':p.character.color, 'color':'#450c10', 'border-radius':'0 8px 0 8px' }">
            <dt style="height:32px; line-height:32px; padding-top:40px; font-size:20px; position:relative;">
              <div :style="{ 'position':'absolute', 'top':0, 'left':0, 'text-align':'center', 'border-radius':'50%', 'border':`2px solid ${p.character.color}`, 'background-color':'#FFF','width':'90px','height':'90px'}">
                <img :src="p.character.image" :alt="p.character.face" width="100%" height="100%" style="border-radius:50%; font-size:14px; line-height:100px;">
              </div>
              <span :style="{ 'padding':'0 16px 0 120px', 'color':p.character.color2, 'font-size':'18px'}">FROM</span>
              {{ p.character.name }}
              <span class="post-time" style="position:absolute; right:0; font-size:13px;">{{ p.date }}</span>
            </dt>
            <dd style="padding:40px 4% 20px 4%; background-color:#fffe; font-size:13px; line-height:16px;">
                <p style="white-space: pre-line;">{{ p.message }}</p>
                <div v-if="p.picture" style="width:92%; padding-top:40px; text-align:center;">
                  <img :src="p.picture" alt="画像" width="60%">
                </div>
            </dd>
            <dd v-if="p.hasAttachment" style="display:inline-block; padding:8px; font-size:12px; color:#aa1e1e;">
              リンクや画像のシェアがあるよ！！
            </dd>
            <dd style="display:inline-block; padding:8px; font-size:12px;">
              <a :href="p.facebook">Facebookに飛ぶ</a>
            </dd>
          </dl>
        </li>
      </ul>
      <!-- ページネーション -->
      <ul class="pageing-links" style="display:flex; flex-wrap:wrap; justify-content:space-evenly; font-size:18px; color:#fff">
        <li v-if="page !== 0" style="padding: 4px;">
            <router-link :to="{ name: 'Page', params: { page: page-1 }}" style="color:#ffac4a;">前へ</router-link>
        </li>
        <li v-for="p in pagingLinks" style="padding: 4px;">
          <template v-if="p === page">{{ page + 1 }}</template>
          <router-link :to="{ name: 'Page', params: { page: p }}" v-else style="color:#ffac4a;">{{ p + 1 }}</router-link>
        </li>
        <li style="padding: 4px;">
          <router-link :to="{ name: 'Page', params: { page: 41 }}" style="color:#ffac4a;">>>シーズン2</router-link>
        </li>
        <li style="padding: 4px;">
          <router-link :to="{ name: 'Page', params: { page: 76 }}" style="color:#ffac4a;">>>シーズン3</router-link>
        </li>
        <li style="padding: 4px;">
          <router-link :to="{ name: 'Page', params: { page: 143 }}" style="color:#ffac4a;">>>シーズン4〜</router-link>
        </li>
        <li v-if="page !== total-1" style="padding: 4px;">
            <router-link :to="{ name: 'Page', params: { page: page+1 }}" style="color:#ffac4a;">次へ</router-link>
        </li>
      </ul>
    </div>

    <!-- メニュー -->
    <div class="menu-container" style="box-sizing:border-box; display:inline-block; vertical-align:top; text-align:center; width:26%; height:1200px; padding:20px 2%; background-color:#fffdfd; border: 6px solid #f5DfF4;">
      <dl>
        <dt style="margin: 0 auto 20px auto; width: 80px; height: 80px; line-height: 80px; font-size: 16px; font-weight: bold; border: 2px solid; border-radius: 50%;">
          MENU
        </dt>
        <dd>
          <ul class="post-date-list">
            <li style="font-size:18px; padding: 16px 0;">
              <a href="https://p.eagate.573.jp/game/bemani/hinabita/p/bittersweets/bio/index.html" target="_blank">
                日向美ビタースイーツ♪ | ひなビタ♪（公式）
              </a>
            </li>
          </ul>
        </dd>
      </dl>
      <p style="text-align:center; line-height:18px; font-size: 12px; color:#621117">
        このサイトは、日向美ビタースイーツ♪のFacebookの内容を公式サイトのBIOGRAPHY風に表示した非公式サイトです。
        2012年11月から2018年4月のブログを読めますが、内容が一部異なる可能性があります。詳細は公式サイトをご覧ください。
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: [],
        total: 1,
        page: this.$route.params.page ? parseInt(this.$route.params.page) : 0,
        pagingLinkNum: 12,
        characters: {
          marika: { name: 'まり花', color: '#f6d174', color2: '#ea7a28', face: '(*´▽｀)', image:'/img/marika04.jpg' },
          ibuki: { name: '一舞', color: '#fff774', color2: '#f7c128', face: '( *｀ω´)', image:'/img/ibu05.jpg' },
          sakiko: { name: '咲子', color: '#bca9fb', color2: '#7a56f7', face: '(*^-^*)', image:'/img/sakiko05.jpg' },
          meu: { name: 'めう', color: '#eec2e4', color2: '#e788ea', face: '♪(°▽^ *)ノ', image:'/img/meu00.png' },
          rin: { name: '凛', color: '#98a0b3', color2: '#576b85', face: '(ー_ー*川', image:'/img/rin06.jpg' },
          kokona: { name: '心菜', color: '#b6e0fa', color2: '#6feafa', face: '(。・ω・。）', image:'/img/cocona_02.png' },
          natsuhi: { name: '夏陽', color: '#e38487', color2: '#e1294e', face: '(。･｀ω･ )', image:'/img/natsuhi_02.png' },
          hinata: { name: '日向', color: '#f5eac4', color2: '#efcc93', face: '(日向)', image:'' },
          unknown: { name: '???', color: '#fff', color2: '#fff', image:'' },
        }
      };
    },
    watch: {
      '$route' (to, from) {
        //console.log(to, from);
        this.page = parseInt(this.$route.params.page);
        this.updatePosts(this.page);
      }
    },
    computed: {
      pagingLinks() {
        const half = this.pagingLinkNum / 2;
        let s = this.page - half;
        let t = this.page + half;
        if (this.page < half) {
          s = 0;
          t = this.pagingLinkNum - 1;
        } else if (this.page >= this.total - half) {
          s = this.total - this.pagingLinkNum;
          t = this.total - 1;
        }
        const res = [];
        for (let i=s; i<=t; i++) {
          res.push(i);
        }
        //console.log(s, t);
        return res;
      }
    },
    mounted() {
      //console.log(this.$route);
      this.updatePosts(this.page);
    },
    methods: {
      updatePosts(page) {
        this.fetchPosts(page)
        .then((res) => {
          //console.log(res);
          this.total = res.total;
          this.posts = res.posts.map((p) => {
            if (p.character) {
              p.character = this.characters[p.character];
            }
            if (p.time) {
              const date = new Date(p.time);
              p.date = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
            }
            return p
          });
        });
      },
      fetchPosts(page) {
        const self = this;
        return new Promise((resolve) => {
          const url = `data/post_${page}.json`;
          fetch(url).then(res => res.json())
          .then((json) => {
            resolve(json);
          });
        });
      }
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 480px) {
    #top-page {
      width: 100% !important;
      padding-bottom: 0 !important;
    }
    .page-title {
      letter-spacing: -2px !important;
    }
    .post-container {
      width: 90% !important;
      .post {
        padding-bottom: 40px !important;
        .post-time {
          top: 0 !important;
        }
      }
    }
    .menu-container {
      height: auto !important;
      width: 92% !important;
      margin: 40px 4% !important;
    }
    .pageing-links {
      font-size: 12px !important;
    }
  }
</style>
