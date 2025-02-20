import { Model, Q, Relation } from "@nozbe/watermelondb";
import { field, lazy, relation } from "@nozbe/watermelondb/decorators";


export class DbIngredient extends Model {
    static table = 'ingredients';

    @field('remote_id') remoteId: string;
    @field('name') name: string;
    @field('unity_of_measure') unityOfMeasure: string;
}

export class DbIngredientQuantity extends Model {
    static table = 'ingredient_quantities';

    @relation('ingredient', 'ingredient_id') ingredient: Relation<DbIngredient>;
    @relation('recipe', 'recipe_id') recipe: Relation<DbRecipe>;

    @field('quantity') quantity: number;
}

export class DbRecipe extends Model {
    static table = 'recipes';

    @field('remote_id') remoteId: string
    @field('name') name: string;
    @field('description') description: string;
    @field('steps_link') stepsLink: string;
    @lazy ingredients = this.collections.get('ingredient_quantities').query(Q.where('recipe_id', this.id));
}