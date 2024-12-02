## Typescript 基础类型
- 字符串
  - ```ts
    let str:string = 'lisi'
    ```
- 数字
  - ```ts
    let num:number = 123
    ```
- 布尔
  - ```ts
    let bool:boolean = false
    ```
- 数组
  - ```ts
    let numbers:number[] = [1,2]
    let strings:Array<string> = ['1','2']
    ```
- 元组：固定长度的数组，可以包含不同类型的元素
  - ```ts
    let person:[string,number] = ['lisi',20]
    ```
- 枚举：
  - ```ts
    enum Color{
        Red,
        Green,
        Blue     
    }
    ```
- 空：never、void
- null undefined
- 任意类型：any
- 浏览器宿主对象：Date、Math

使用const进行变量命名时，因为const声6明时必须赋值，会进行类型推断

## 接口 interface

可以指定对象的属性、方法及其类型，且可以通过扩展实现复用，一般情况下用来抽象对象的特性，使用时有两种途径：直接 implements 或者直接作为类型来约束变量

```ts
interface User {
    readonly name:string,//只读属性
    age?:number,//可选属性
    say():viod
}
//继承
interface Lisi extends User{
    sex:string
}
const user:User = {
    name:'lisi',
    age:20,
    say:()=>{
        console.log(111)
    }
}
class User implements User {
    name:string
    age:number
    construcotor(name:string,age:number){
        this.name = name
        this.age = age
    }
    say():viod {
        console.log(111)
    }
}
```

## 类型别名 type

`type`关键字用于定义类型别名，可以是基础类型、联合类型、交叉类型
```ts
//联合类型
type Id = number|string
//交叉类型
type Name = string
type Age = number
type Person = Name & Age
//字面量类型
type Status = 'success'|'error'|'loading'
```
## 泛型 Generics

它允许你创建可以适用多种类型的函数、接口或类

泛型函数
```ts
function init<T>(arg:T):T {
    return arg
}
let result = init(1)
let result1 = init('lisi')
```
泛型函数：使用泛型接口定义函数类型
```ts
interface Init<T>{
  (arg:T):T
}
const init :Init<number> = (arg) => arg
```
泛型类
```ts
class Box<T>{
    value:T
  constructor(value:T){
        this.value = value
  }
}
const box = new Box(1)
```
泛型约束
```ts
interface User {
  name: string;
  age?: number;
}
function getLength<T extends User>(arg:T):T{
  return arg;
}
```
## 类型推导

基本类型推导
```ts
let age = 10 //number
```
函数返回值推导
```ts
//推导返回值为number
function add(a:number,b:number){
    return a + b
}
```
数组和对象的推导
```ts
let numbers = [1,2,3,4]//number[]
let user = {name:'lisi',age:20}//{name:string,age:number}
```
## 关键字 extends

**用于继承类**

在类之间使用`extends`关键字可以继承一个类的所有属性和方法
```ts
class Animal {
    name:string
    constructor(name:string) {
        this.name=name
    }
    speak(){
        console.log('animal'+this.name)
    }
}
class Dog extends Animal {
    constructor(name:string) {
        super(name)
    }
    speak() {
        console.log('Dog'+this.name)
    }
}
const dog = new Dog('dog')
dog.speak()
```
**用于泛型约束**

用于约束泛型的类型，确保泛型满足特定条件
```ts
function init<T extends string|number>(arg: T): T {
    return arg
}
```
**用于条件类型的类型推断**

与条件类型结合使用，用来根据类型进行不同的推导或处理
```ts
type Init<T> = T extends string ? T : never;
type Text1 = Init<string>//string
type Text2 = Init<number>//never
```
**与infer结合使用**
```ts
type FnReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Fn = (a:string,b:number)=> number
type ReturnTypeOfFn = FnReturnType<Fn>
```
这里使用`T extends (...args: any[]) => infer R`判断`T`是否是一个函数类型，并使用`infer R` 提取函数的返回类型

**条件类型与extends的综合应用**

## infer 关键字