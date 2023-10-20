import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GameModule } from '../game/game.module';
import { WordsModule } from '../words/words.module';
import { AdminEmojisCommands } from './commands/emojis.commands';
import { AdminGetWordCommands } from './commands/get-word.commands';
import { AdminRecreateCommands } from './commands/recreate.commands';
import { AdminSendWelcomeCommands } from './commands/send-welcome.commands';

@Module({
	imports: [SharedModule, WordsModule, GameModule],
	providers: [
		// commands
		AdminEmojisCommands,
		AdminRecreateCommands,
		AdminSendWelcomeCommands,
		AdminGetWordCommands,
	],
})
export class AdminModule {}
