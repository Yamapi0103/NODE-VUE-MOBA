# NODE-VUE-MOBA
後台: admin 
伺服器:server 
前台: web

在對應資料夾底下執行npm run serve，即可開啟對應的程式碼

教學視頻:
https://www.bilibili.com/video/BV1A4411Y7fi
UP主github:
https://github.com/topfullstack/node-vue-moba


###小技巧
抓新聞資訊:
$$('.news_list .title').map(el => el.innerHTML) 
抓英雄分類
$$('.hero-nav > li').map(li=>li.innerText)
抓英雄分類對應的細項
$$(".hero-nav > li").map((li, i) => {
  return {
    name: li.innerText,
    heroes: $$("li", $$(".hero-list")[i]).map((el) => {
      return {
        name: $$("h3", el)[0].innerHTML,
        avatar:$$('img', el)[0].src
      };
    }),
  };
});
