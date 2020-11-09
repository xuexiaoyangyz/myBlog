'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    // 首页的文章列表数据
    this.ctx.body = 'hi api';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT userName FROM admin_user WHERE userName = "${userName}" AND password = "${password}"`;

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: 'success', openId };
    } else {
      this.ctx.body = { data: 'error' };
    }
  }

  async getTypeInfo() {
    this.ctx.body = { data: await this.app.mysql.select('type') };
  }

  // 新增或者更新文章
  async addorUpdateArticle() {
    const request = this.ctx.request.body;
    let result;
    if (request.id) {
      result = await this.app.mysql.update('article', request);
      const updateSuccess = result.affectedRows === 1;
      this.ctx.body = {
        isScussess: updateSuccess,
      };
    } else {
      result = await this.app.mysql.insert('article', request);
      const insertSuccess = result.affectedRows === 1;
      const insertId = result.insertId;
      this.ctx.body = {
        isScussess: insertSuccess,
        insertId,
      };
    }
  }

  async getArticleList() {
    const sql = `SELECT 
                  art.id as id,
                  art.title as title,
                  art.introduce as introduce,
                  art.addTime as addTime,
                  art.view_count as viewCount,
                  art.article_content as articleContent,
                  t.typeName as typeName
                FROM article art LEFT JOIN type t ON art.type_id = t.id`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getArticleListById() {
    const id = this.ctx.params.id;
    const sql = `SELECT 
                  art.id as id,
                  art.title as title,
                  art.introduce as introduce,
                  art.addTime as addTime,
                  art.view_count as viewCount,
                  art.article_content as articleContent,
                  t.typeName as typeName
                FROM article art LEFT JOIN type t ON art.type_id = t.id
                where art.id = ${id}`;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async deleteArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

}

module.exports = MainController;
