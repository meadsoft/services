export class FileMetadata {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class FileUrl {
    metadata: FileMetadata;
    url: string;
    urlExpirationDate: string;

    constructor(
        metadata: FileMetadata,
        url: string,
        urlExpirationDate: string,
    ) {
        this.metadata = metadata;
        this.url = url;
        this.urlExpirationDate = urlExpirationDate;
    }
}
