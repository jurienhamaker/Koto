import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GameModule } from '../game/game.module';
import { WordsModule } from '../words/words.module';
import { AdminEmojisCommands } from './commands/emojis.commands';
import { AdminRecreateCommands } from './commands/recreate.commands';

@Module({
	imports: [SharedModule, WordsModule, GameModule],
	providers: [
		// commands
		AdminEmojisCommands,
		AdminRecreateCommands,
	],
})
export class AdminModule {}
