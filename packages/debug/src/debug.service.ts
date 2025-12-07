import { INestApplication, Injectable } from "@nestjs/common";


@Injectable()
export class DebugService {
    listRoutes(app: INestApplication): string[] {
        const server = app.getHttpAdapter().getInstance();
        const routes: string[] = [];

        server._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
            // Route object
            const path = middleware.route?.path;
            const methods = Object.keys(middleware.route.methods)
            .map((m) => m.toUpperCase())
            .join(', ');
            routes.push(`${methods} ${path}`);
        }
        });

        return routes;
    }
}
