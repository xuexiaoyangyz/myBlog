'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api hi';
  }

  async getArticleList() {
    const sql = `SELECT 
                  art.id as id,
                  art.title as title,
                  art.introduce as introduce,
                  art.addTime as addTime,
                  art.view_count as view_count,
                  art.article_content as content,
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
                  art.view_count as view_count,
                  art.article_content as content,
                  t.typeName as typeName
                FROM article art LEFT JOIN type t ON art.type_id = t.id
                where art.id = ${id}`;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async getArticleListByTypeId() {
    const id = this.ctx.params.id;
    const sql = `SELECT 
                  art.id as id,
                  art.title as title,
                  art.introduce as introduce,
                  art.addTime as addTime,
                  art.view_count as view_count,
                  art.article_content as content,
                  t.typeName as typeName
                FROM article art LEFT JOIN type t ON art.type_id = t.id
                WHERE t.id = ${id}`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

}

module.exports = HomeController;
