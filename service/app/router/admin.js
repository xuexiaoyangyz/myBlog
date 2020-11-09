'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminAuth = app.middleware.adminAuth();
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', adminAuth, controller.admin.main.getTypeInfo);
  router.post('/admin/addorUpdateArticle', adminAuth, controller.admin.main.addorUpdateArticle);
  router.get('/admin/getArticleList', adminAuth, controller.admin.main.getArticleList);
  router.get('/admin/getArticleListById/:id', adminAuth, controller.admin.main.getArticleListById);
  router.get('/admin/deleteArticle/:id', adminAuth, controller.admin.main.deleteArticle);
};

