import Koa from 'koa'
import Router from 'koa-router'
import _ from 'underscore'

const app = new Koa()
const router = new Router()

const fakeDelay = (delay) => new Promise(res => setTimeout(res, delay))

const data = {
  1: {
    title: 'How much does employee turnover really cost?',
    desc: 'People are companies’ most important assets. We’ve all known this for a long time, but 1) we pay it lip service more often than we try to do something about it, and 2) it’s true more now than ever.',
    link: 'https://medium.com/latticehq/how-much-does-employee-turnover-really-cost-d61df5eed151#.cw8mlmdn5',
    clicks: 10,
    views: 15
  },
  2: {
    title: 'Nylas Mail is now free ',
    desc: 'Hey folks! Michael here, co-founder and CEO of Nylas. Today I’ve got some exciting news to share with you:',
    link: 'https://blog.nylas.com/nylas-mail-is-now-free-8350d6a1044d#.r7zthctjp',
    clicks: 12,
    views: 30
  },
  3: {
    title: 'Pixie – A small, fast, native Lisp',
    desc: 'Pixie is a lightweight lisp suitable for both general use as well as shell scripting. The standard library is heavily inspired by Clojure as well as several other functional programming languages. It is written in RPython and as such supports a fairly fast GC and an amazingly fast tracing JIT.',
    link: 'http://pixielang.org/',
    clicks: 30,
    views: 45
  },
  4: {
    title: 'Moving beyond localStorage',
    desc: 'It’s hard to believe that as of 2016, the best method for offline storage in a web app was localStorage, a simple string-only key value store with a 5mb data limit.',
    link: 'https://journal.standardnotes.org/moving-beyond-localstorage-991e3695be15#.84x4omb8j',
    clicks: 3,
    views: 155
  },
  5: {
    title: 'Remote-control your Slack bots with JSON',
    desc: 'If you think about it, this is a pretty refreshing idea. Basically, it is a mobile app for remote-controlling a Slack bot.',
    link: 'http://blog.jasonette.com/2016/01/17/build-a-slackbot-with-jasonette/',
    clicks: 11,
    views: 45
  }
}

router.get('/news', async (ctx, next) => {

  await fakeDelay(1000)

  const list = {}
  _.each(data, (news, id) => list[id] = { title: news.title })

  ctx.body = list
})

router.get('/news/:id', async (ctx, next) => {
  await fakeDelay(500)

  const news = data[ctx.params.id]
  ctx.body = {
    title: news.title,
    desc: news.desc,
    link: news.link
  }
})

router.get('/news/info/:id', async (ctx, next) => {
  await fakeDelay(500)

  const news = data[ctx.params.id]
  ctx.body = {
    views: news.views,
    clicks: news.clicks
  }
})

module.exports = app.use(router.routes())
