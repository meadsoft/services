import { Test, TestingModule } from '@nestjs/testing';
import { InfrastructureModule } from './infrastructure.module';
import { BaseModelService } from './base-model.service';
import { InfrastructureConfig } from './infrastructure.config';

const EXAMPLE_DB_URL = 'example-database-url';

describe('InfrastructureModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        process.env.DATABASE_URL = EXAMPLE_DB_URL;
        module = await Test.createTestingModule({
            imports: [InfrastructureModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should provide BaseModelService', () => {
        const service = module.get<BaseModelService>(BaseModelService);
        expect(service).toBeDefined();
        expect(service).toBeInstanceOf(BaseModelService);
    });

    it('should provide InfrastructureConfig', () => {
        const config = module.get<InfrastructureConfig>(InfrastructureConfig);
        expect(config).toBeDefined();
        expect(config).toBeInstanceOf(InfrastructureConfig);
    });

    it('should provide mock InfrastructureConfig.DATABASE_URL value', () => {
        const config = module.get<InfrastructureConfig>(InfrastructureConfig);
        expect(config.DATABASE_URL).toBe(EXAMPLE_DB_URL);
    });

    it('should export BaseModelService', () => {
        const exportedService = module.get<BaseModelService>(BaseModelService);
        expect(exportedService).toBeDefined();
    });

    it('should export InfrastructureConfig', () => {
        const exportedConfig =
            module.get<InfrastructureConfig>(InfrastructureConfig);
        expect(exportedConfig).toBeDefined();
    });
});
