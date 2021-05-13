/* 
제네릭의 Hello World (Hello World of Generics)
타입변수(Type variable) 사용
함수 사용자가 제공한 타읍을 캡처하여 나중에 해당 정보를 사용할수 있도록 함
*/
function identity<T>(arg:T):T{
    return arg;
}
//출력방법 1. <> 안에 명시적으로 string 작성
let output = identity<string>("mystring");
//출력방법 2. 타입추론(type argument inference)사용
let output2 = identity('mystring');

/*
Generic 타입
*/
function loggingIdentity<T>(arg: T): T {
    return arg;
}
//1. 함수 선언과 비슷하게 타입 매개변수가 먼저 나열된 비 제네릭 함수의 타입은 같습니다
let myIdentity1:<T>(arg:T) => T = loggingIdentity;
//2. 타입 변수의 사용이 일치하다면 제네릭 타입 매개변수에 다른 이름을 사용할 수도 있습니다
let myIdentity2: <U>(arg: U) => U = loggingIdentity;
//3. 객체 리터럴 타입의 호출 형식으로도 사용할 수 있습니다
let myIdentity3: {<T>(arg: T): T} = loggingIdentity;
//4. 객체 리터럴을 가져와 인터페이스로 옮깁니다
interface GenericIdentityFn<T>{
    (arg:T):T;
}
let myIdentity4:GenericIdentityFn<number> = loggingIdentity;

/* 
제네릭 클래스
*/

class GenericNumber<T>{
    zeroValue:T;
    add:(x:T,y:T) => T;
}

// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x,y){return x+y;};
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "generic";
stringNumeric.add = function(x, y) { return x + y; };

alert(stringNumeric.add(stringNumeric.zeroValue, "test"));