'use strict';

module.exports = (options) => {
  return async function adminAuth(ctx, next) {
    console.log(ctx.session);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.status = 401
      ctx.body = { data: 'no access' };
    }
  };
};
