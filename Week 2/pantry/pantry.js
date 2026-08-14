import { readFile } from "node:fs/promises";

export function checkIngredients(recipe, pantry) {
    const miss = [];

    for (let i of recipe.ingredients) {
        if (!pantry.some(x => x.name === i.name && x.quantity >= i.quantity && x.unit === i.unit)) {
        miss.push(i.name)
        }
    }
    
    return {canMake: miss.length === 0, missing: miss.length === 0 ? "None" : miss}
}

