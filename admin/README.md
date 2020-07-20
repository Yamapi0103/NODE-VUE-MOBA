# admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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