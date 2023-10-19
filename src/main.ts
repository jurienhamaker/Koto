import { NestFactory } from '@nestjs/core';
import { KotoModule } from './koto.module';

async function bootstrap() {
	const app = await NestFactory.create(KotoModule, {
		cors: true,
	});

	app.setGlobalPrefix('api');
	await app.listen(3000);
}
bootstrap();
