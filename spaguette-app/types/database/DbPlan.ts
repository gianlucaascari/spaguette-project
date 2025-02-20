import { Model, Relation } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { DbIngredient, DbRecipe } from "./DbCatalogue";

export class DbPlan extends Model {
    static table = 'plan';

    @field('num_times') numTimes: number;
    @relation('recipes', 'recipe_id') recipe: Relation<DbRecipe>;
}

export class DbList extends Model {
    static table = 'list';

    @relation('ingredients', 'ingredient_id') ingredient: Relation<DbIngredient>;
    @field('quantity') quantity: number;
    @field('taken') taken: boolean;
}

    