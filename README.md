# web-proxy

用于代理请求的工具

## Command

```bash
 npm start # now, you can fetch request for every where by http://localhost:3000/proxy?url=
```

## Usage

> baseurl: http://localhost:3000/proxy?url=${any you want}

Support `GET`, `POST`, `PUT`, `DELETE`

If request failed, will be returned：

```json
{
  status: 0,
  message: "url in query is required"
}
```

If request success, will return what you want!

For example:

```js
  const url = 'https://api.douban.com/v2/book/search?q=%E5%B0%86%E5%A4%9C';
  fetch(`http://localhost:3000/proxy?url=${url}&endoce=url`)
    .then(resp => resp.json())
    .then(result => console.log(result));
```

## Parames

### url

> The url what you want to request

### encode

> It will try `encodeURI` for your url by it's value

```bash
  curl http://localhost:3000/proxy?url=https://api.douban.com/v2/book/search?q=四大名著&encode=url
```