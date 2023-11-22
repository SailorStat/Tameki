const hasProperty = <T extends object>(obj: T, value: number | string | symbol): value is keyof T => value in obj;

export default hasProperty;
