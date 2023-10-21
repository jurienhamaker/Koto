import { Controller, Get } from '@nestjs/common';

@Controller('bots-gg')
export class BotsGGController {
	@Get('/webhook')
	webhook() {
		return {
			status: 'OK',
		};
	}
}
