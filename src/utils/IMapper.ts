export interface IMapper<TSource, TTarget> {
  map(model: TSource): TTarget;
}
