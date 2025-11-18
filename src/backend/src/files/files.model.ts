export class FileMetadata {
    id: string;
    name: string;
}

export class FileUrl {
    metadata: FileMetadata;
    url: string;
    urlExpirationDate: string;
}
