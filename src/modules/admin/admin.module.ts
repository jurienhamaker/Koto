import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GameModule } from '../game/game.module';
import { WordsModule } from '../words/words.module';
import { AdminEmojisCommands } from './commands/emojis.commands';
import { AdminGetWordCommands } from './commands/get-word.commands';
import { AdminGuildsCommands } from './commands/guilds.commands';
import { AdminRecreateCommands } from './commands/recreate.commands';
import { AdminScrapeWordsCommands } from './commands/scrape-words.commands';
import { AdminSendWelcomeCommands } from './commands/send-welcome.commands';
import { AdminGuildsService } from './services/guilds.service';
import { AdminScrapeService } from './services/scrape.service';

@Module({
	imports: [SharedModule, WordsModule, GameModule, HttpModule],
	providers: [
		AdminScrapeService,
		AdminGuildsService,

		// commands
		AdminEmojisCommands,
		AdminRecreateCommands,
		AdminSendWelcomeCommands,
		AdminGetWordCommands,
		AdminGuildsCommands,

		...(process.env.NODE_ENV !== 'production'
			? [AdminScrapeWordsCommands]
			: []),
	],
})
export class AdminModule {}
