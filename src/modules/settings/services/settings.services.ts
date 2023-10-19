import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services';

@Injectable()
export class SettingsService {
	private readonly _logger = new Logger(SettingsService.name);

	constructor(private _prisma: PrismaService) {}

	async getSettings(guildId: string, doCheck = true) {
		this._logger.verbose(`Getting settings for guild: ${guildId}`);

		if (doCheck) {
			return this.checkSettings(guildId);
		}

		return this._prisma.settings.findUnique({
			where: {
				guildId,
			},
		});
	}

	async checkSettings(guildId: string) {
		const settings = await this._prisma.settings.findUnique({
			where: {
				guildId,
			},
		});

		if (!settings) {
			return this._prisma.settings.create({
				data: { guildId },
			});
		}

		return settings;
	}
}
