import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { WordsService } from './services/words.service';

@Module({
	imports: [SharedModule],
	providers: [WordsService],
	exports: [WordsService],
})
export class WordsModule {}
