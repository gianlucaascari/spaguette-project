import { Model, Q, Query, Relation } from "@nozbe/watermelondb";
import { children, field, lazy, relation } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import { UnityOfMeasure } from "../application/Catalogue";


export class DbIngredient extends Model {
    static table = 'ingredients';

    @field('remote_id') remoteId: string;
    @field('name') name: string;
    @field('unity_of_measure') unityOfMeasure: UnityOfMeasure;
}

export class DbIngredientQuantity extends Model {
    static table = 'ingredient_quantities';

    @relation('ingredients', 'ingredient_id') ingredient: Relation<DbIngredient>;
    @relation('recipes', 'recipe_id') recipe: Relation<DbRecipe>;

    @field('quantity') quantity: number;
}

export class DbRecipe extends Model {
    static table = 'recipes';
    static associations: Associations = {
        ingredient_quantities: { type: 'has_many', foreignKey: 'recipe_id' },
    }

    @field('remote_id') remoteId: string
    @field('name') name: string;
    @field('description') description: string;
    @field('steps_link') stepsLink: string;
    @children('ingredient_quantities') ingredientQuantities: Query<DbIngredientQuantity>;
}