import { Model, Relation } from '@nozbe/watermelondb'
import { field, text, relation, children } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'

export enum TableName {
    BLOGS = 'blogs',
    POSTS = 'posts',
  }

export default class Post extends Model {
    static table = TableName.POSTS
  
    static associations: Associations = {
      [TableName.BLOGS]: { type: 'belongs_to', key: 'blog_id' },
    }
  
    @field('name') name: string;
    @field("body") content: string;
    @field('is_pinned') isNasty: boolean;

  }