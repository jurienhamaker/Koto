import { Controller, Get } from '@nestjs/common';

@Controller('discordbotlist')
export class DiscordBotListController {
	@Get('/webhook')
	webhook() {
		return {
			status: 'OK',
		};
	}
}
