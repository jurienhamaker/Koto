import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GeneralDonateCommands } from './commands/donate.commands';
import { GeneralInviteCommands } from './commands/invite.commands';
import { GeneralSupportCommands } from './commands/support.commands';
import { GeneralTutorialCommands } from './commands/tutorial.commands';

@Module({
	imports: [SharedModule],
	providers: [
		// commands
		GeneralInviteCommands,
		GeneralDonateCommands,
		GeneralTutorialCommands,
		GeneralSupportCommands,
	],
})
export class GeneralModule {}
