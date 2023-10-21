import { Controller, Get } from '@nestjs/common';

@Controller('top-gg')
export class TopGGController {
	@Get('/webhook')
	webhook() {
		return {
			status: 'OK',
		};
	}
}
