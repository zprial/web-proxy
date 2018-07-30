const fetch = require('node-fetch');
const url = require('url');

const getProxyController = async (ctx, next) => {
  const _url = ctx.request.query.url;
  try {
    if (!_url) {
      throw new Error('url in query is required');
    }
    const thisUrl = url.parse(_url);
    const params = {
      headers: {
        ...ctx.request.headers,
        host: thisUrl.host,
        referer: thisUrl.protocol + '//' + thisUrl.host,
      }
    }
    ctx.response.body = await fetch(_url, params).then(r => r.text());
  } catch (error) {
    ctx.response.body = {
      status: 0,
      message: error.message
    };
  }
};

const postProxyController = async (ctx, next) => {
  const _url = ctx.request.query.url;
  const rawBody = ctx.request.rawBody;
  try {
    if (!_url) {
      throw new Error('url in query is required');
    }
    const thisUrl = url.parse(_url);
    const params = {
      method: ctx.request.method,
      headers: {
        ...ctx.request.headers,
        host: thisUrl.host,
        referer: thisUrl.host,
      },
      body: rawBody
    }
    ctx.response.body = await fetch(_url, params).then(r => r.text());
  } catch (error) {
    ctx.response.body = {
      status: 0,
      message: error.message
    };
  }
};

module.exports = [{
  methods: 'GET',
  path: '/proxy',
  controller: getProxyController
}, {
  methods: ['POST', 'PUT', 'DELETE'],
  path: '/proxy',
  controller: postProxyController
}];
