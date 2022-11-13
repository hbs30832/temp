"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./common/filter/http-exception.filter");
const success_interceptor_1 = require("./common/interceptor/success.interceptor");
const expressBasicAuth = require("express-basic-auth");
const path = require("path");
const cookireParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new success_interceptor_1.SuccessInterceptor());
    app.use(cookireParser());
    app.use(['/docs/', '/docs-json'], expressBasicAuth({
        challenge: true,
        users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
    }));
    app.useStaticAssets(path.join(__dirname, '/common', '/uploads'), {
        prefix: '/media',
    });
    const PORT = process.env.PORT;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nepp Blog')
        .setDescription('Nepp Blog API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.enableCors();
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map