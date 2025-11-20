import { Module } from '@nestjs/common';
import { HaruCafeCmsConfigProvider } from './haru-cafe-cms.config';

@Module({
    imports: [],
    controllers: [],
    providers: [HaruCafeCmsConfigProvider],
})
export class HaruCafeCmsModule {}
