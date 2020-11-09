'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArticleListById/:id', controller.default.home.getArticleListById);
  router.get('/default/getArticleListByTypeId/:id', controller.default.home.getArticleListByTypeId);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
};
