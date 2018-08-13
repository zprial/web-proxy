module.exports = async (ctx, next) => {
  const query = ctx.query;
  if (query.encode) {
    const encodeKeys = query.encode.split(',');
    encodeKeys.forEach(key => {
      query[key] = encodeURI(query[key]);
    });
  }
  await next();
}