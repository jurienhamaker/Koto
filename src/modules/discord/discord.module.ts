import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';

@Module({
	imports: [SharedModule],
	providers: [],
})
export class DiscordModule {}
