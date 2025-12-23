export interface IFilter<TValue = unknown> {
    field: string;
    operator: string;
    value: TValue;
}
