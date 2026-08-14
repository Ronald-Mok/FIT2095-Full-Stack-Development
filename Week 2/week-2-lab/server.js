import http from "node:http";
import { readFile } from "node:fs/promises";

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/scale-recipe") {
    const requestedServings = Number(url.searchParams.get("servings"));

    // ALWAYS validate query-string input before using it — never trust it as-is
    if (!Number.isFinite(requestedServings) || requestedServings <= 0) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Bad request: 'servings' must be a positive number, e.g. ?servings=4");
      return; // stop here — do NOT fall through to the code below
    }

    const recipes = JSON.parse(await readFile("./recipes.json", "utf-8"));
    const recipe = recipes[0];
    const scale = requestedServings / recipe.servings;

    const scaledLines = recipe.ingredients.map(
      i => `${(i.quantity * scale).toFixed(1)} ${i.unit} ${i.name}`
    );

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(
      `${recipe.title}, scaled for ${requestedServings} serving(s):\n` + scaledLines.join("\n")
    );
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("Not found");
});

server.listen(8080);
// try: http://localhost:8080/scale-recipe?servings=8
// try: http://localhost:8080/scale-recipe?servings=abc   (should now return 400, not crash)
