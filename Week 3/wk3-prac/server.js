import {readFile} from "node:fs/promises";
import http from "node:http";

const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, `https://${request.headers.host}`);

    try {
        if (url.pathname === "/") {
            const homePage = await readFile("./views/index.html", "utf-8")
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(homePage);
            return;
        }
        
        if (url.pathname === "/assessments") {
            const assessmentsPage = await readFile("./views/assessments.html", "utf-8")
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(assessmentsPage);
            return;
        }
        
        if (url.pathname === "/topics") {
            const topicsPage = await readFile("./views/topics.html", "utf-8")
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end("Visited topics");
            return;
        }
        
        if (url.pathname === "/which-week") {
            let day = Number(url.searchParams.get("d"));
            let month = Number(url.searchParams.get("m"));
            let year = Number(url.searchParams.get("y"));

            const FIRST_DAY = new Date(2026, 6, 27);

            function getTeachingWeek(day, month, year) {
                const requested = new Date(year, month-1, day);
                const msPerDay = 1000*60*60*24;
                const daysSinceStart = Math.floor((requested-FIRST_DAY)/msPerDay);

                if (daysSinceStart < 0) return { error: "That date is before semester starts." };

                const week = Math.floor(daysSinceStart / 7) + 1;
                if (week > 12) return { error: "That date is after the teaching weeks (past week 12)." };

                return { week };
            }
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(`You are in week ${getTeachingWeek(day, month, year)["week"]}`);
            return;
        }

        // if (url.pathname === "/api/scale-recipe") {
        //     const requestedServings = Number(url.searchParams.get("servings"));
        //     if (!Number.isFinite(requestedServings) || requestedServings <= 0) {
        //         response.writeHead(400, { "Content-Type": "application/json" });
        //         response.end(JSON.stringify({ error: "'servings' must be a positive number" }));
        //         return;
        //     }

        //     const recipes = JSON.parse(await readFile("./recipes.json", "utf-8"));
        //     const recipe = recipes[0];
        //     const scale = requestedServings / recipe.servings;

        //     const scaled = {
        //         title: recipe.title,
        //         servings: requestedServings,
        //         ingredients: recipe.ingredients.map(i => ({
        //         name: i.name,
        //         unit: i.unit,
        //         quantity: Number((i.quantity * scale).toFixed(1)),
        //         })),
        //     };

        //     response.writeHead(200, { "Content-Type": "application/json" });
        //     response.end(JSON.stringify(scaled));
        //     return;
        // }

    } catch {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Server error");
    }

    const errorPage = await readFile("./views/404.html", "utf-8")
    response.writeHead(404, {"Content-Type": "text/html"});
    response.end(errorPage);

})

server.listen(8080);
