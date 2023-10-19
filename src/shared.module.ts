import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SettingsSharedModule } from './modules/settings';

@Module({
	imports: [PrismaModule, SettingsSharedModule],
	exports: [PrismaModule, SettingsSharedModule],
})
export class SharedModule {}
