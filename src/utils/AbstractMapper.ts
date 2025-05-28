import { IMapper } from "./IMapper";

export abstract class AbstractMapper<TSource, TTarget>
  implements IMapper<TSource, TTarget>
{
  abstract map(model: TSource): TTarget;
}
