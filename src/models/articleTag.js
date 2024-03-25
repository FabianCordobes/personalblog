import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';
import Article from './article.js';
import Tag from './tag.js';

class ArticleTag extends Model {}

ArticleTag.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  articleId: {
    type: DataTypes.UUID,
    references: {
      model: Article,
      key: 'id',
    },
  },
  tagId: {
    type: DataTypes.UUID,
    references: {
      model: Tag,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'ArticleTag',
});

Article.belongsToMany(Tag, { through: ArticleTag });
Tag.belongsToMany(Article, { through: ArticleTag });

export default ArticleTag;
