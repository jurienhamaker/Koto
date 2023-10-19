import { Module } from '@nestjs/common';
import { SettingsGuildEvents } from './events/guild.events';
import { SettingsSharedModule } from './settings.shared.module';

@Module({
	imports: [SettingsSharedModule],
	providers: [SettingsGuildEvents],
})
export class SettingsModule {}
