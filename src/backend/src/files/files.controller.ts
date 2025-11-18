import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileMetadata, FileUrl } from './files.model';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {}

    @Get(':id')
    async getUrl(@Param('id') id: string): Promise<string> {
        return await this.filesService.getUrl(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'List of files',
        type: FileMetadata,
    })
    async upload(@UploadedFile() file: Express.Multer.File): Promise<FileUrl> {
        return await this.filesService.upload(file);
    }

    @Put()
    async update(@UploadedFile() file: Express.Multer.File) {
        return await this.filesService.upload(file);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.filesService.delete(id);
    }
}
