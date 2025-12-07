export interface Schema {
    parse<T>(data: unknown): T;
}

export interface ValidationService<> {
    validate<T>(data: unknown, schema: any): T;
}
