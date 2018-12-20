import express from "express";

function apiGateway(options) {

    const app = express();
    const middlewares = {};

    return {
        registerMiddleware(name, middleware) {
            if (typeof name !== "string") {
                throw new Error("name must be a string");
            }
            if (typeof middleware !== "function") {
                throw new Error("middleware must be a function");
            }
            if (middlewares[name]) {
                throw new Error(`Middleware ${name} is already registered`);
            }
            middlewares[name] = middleware;
        },
        initialize(options) {
            // initialize api-gateway
            return app;
        }
    };
};
export default apiGateway;