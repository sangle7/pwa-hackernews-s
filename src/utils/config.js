const config = {
  menu: [{
    to: '/top/1',
    name: 'top'
  },{
    to: '/new/1',
    name: 'new'
  },{
    to: '/show/1',
    name: 'show'
  },{
    to: '/ask/1',
    name: 'ask'
  },{
    to: '/job/1',
    name: 'job'
  },{
    to: '/about',
    name: 'about'
  }],
  HNapi:'https://node-hnapi.herokuapp.com',
  officialAPI:' https://hacker-news.firebaseio.com/v0',
  requestPrefix:{
    top:{
      official:'topstories',
      unofficial:'news'
    },
    new:{
      official:'newstories',
      unofficial:'newest'
    },
    show:{
      official:'showstories',
      unofficial:'show'
    },
    job:{
      official:'jobstories',
      unofficial:'jobs'
    },
    ask:{
      official:'askstories',
      unofficial:'ask'
    }
  }
}
export default config