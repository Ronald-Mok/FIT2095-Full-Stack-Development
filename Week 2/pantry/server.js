import {readFile} from "node:fs/promises";
import http from "node:http";
import {checkIngredients} from "./pantry.js";



const server = http.createServer(async (req,res) => {
    const url = new URL(req.url, `https://${req.headers.host}`)

    try {
        if (url.pathname === "/") {
            const homePage = await readFile("./index.html", "utf-8");
            res.writeHead(200, {"Content-Type":"text/plain"});
            res.end(homePage);
            return;
        }
        
        if (url.pathname === "/can-make") {
            const userIn = url.searchParams.get("recipe");
            const recipeList =  JSON.parse(await readFile("./recipes.json", "utf-8"));
            const pantry =  JSON.parse(await readFile("./pantry.json", "utf-8"));
            const recipe = recipeList.find(x => x.title === userIn)
            const result = checkIngredients(recipe, pantry)

            res.writeHead(200, {"Content-Type":"application/json"});
            res.end(JSON.stringify(result));
            return;
        }
            res.writeHead(404, {"Content-Type":"text/plain"})
            res.end()        

    }catch (error) {
    console.log(error);

    res.writeHead(500, {"Content-Type":"text/plain"});
    res.end("Internal Server Error");
}
    
})

server.listen(8080);
