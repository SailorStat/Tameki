import { JwtAuthGuard } from "@guards/jwt-auth.guard";
import { HttpStatus, UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  // const jwtService = app.get(JwtService);
  // app.useGlobalGuards(new JwtAuthGuard(jwtService));

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Sailor Friends API")
    .setDescription("Документация для API маркетплейса Sailor Friends")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(port, () => console.log(`Server started on ${port} port`));
}

bootstrap();
