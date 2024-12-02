type FnReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Fn = (a:string,b:number)=> number
type ReturnTypeOfFn = FnReturnType<Fn>