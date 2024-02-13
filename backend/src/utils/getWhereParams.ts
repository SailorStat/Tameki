export const getWhereParams = <RawParams extends object, Entity extends object>(
  rawParams: RawParams,
  entity: Entity,
): Partial<Entity> => {
  const keyOfEntity = Object.keys(entity);

  return Object.entries(rawParams).reduce((params, [key, value]) => {
    if (keyOfEntity.includes(key)) {
      params[key] = value;
    }

    return params;
  }, {});
};
