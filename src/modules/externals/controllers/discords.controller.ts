import { Controller, Get } from '@nestjs/common';

@Controller('discords')
export class DiscordsController {
	@Get('/webhook')
	webhook() {
		return {
			status: 'OK',
		};
	}
}
