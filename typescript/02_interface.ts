/*var, let, const
비구조화(Destructuring) => Array Destructuring , Object Destructuring
기본값(Default values)
함수선언(Function declarations)
전개연산자(Spread)
*/

/* 인터페이스(Interface) */
//기본적인 Interface
interface LabelledValue{
    label:string;
}

function printLabel(labelledObj:LabelledValue){
    console.log(labelledObj.label);
}

let myObj = {size:10, label:"size 10 object"};
printLabel(myObj);

/*선택적 프로퍼티(Optional Properties), 모든 프로퍼티가 필수가 아닐경우
옵션 백(option bags) 패턴의 예*/
interface SquareConfig{
    color?: string; //? : 존재하거나 존재하지 않을 수 있다
    width?: number;
    [opacity: string]: any;
}

function createSquare(config:SquareConfig): {color:string; area:number}{
    let newSquare = { color: "white", area:100};
    if(config.color){
        newSquare.color=config.color;
    }

    if(config.width){
        newSquare.area = config.width*config.width;
    }

    return newSquare;
}

// let mySqure = createSquare({color:"black"});
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//선택적 프로퍼티의 장점
//사용가능한 프로퍼티를 성명하고, 인터페이스에 포함되지 않은 프로퍼티의 사용을 방지


/*읽기 전용 프로퍼티(Readonly properties)*/
interface Point{
    readonly x:number;
    readonly y:number; 
}
// 객체를 처음 생성할 때만 수정 가능
let p1:Point = {x:10, y:20};
// p1.x=5; //오류

//모든 변형 메서드가 제거된 Array<T>와 동일한 ReadonlyArray<T>타입이 있으므로 생성 후 배열을 변경하지 말아야 합니다
let a: number[] = [1,2,3,4];
let ro:ReadonlyArray<number>= a;
// ro[0]=12;
// ro.push(5);
// ro.length=100;
// a=ro;  //읽기전용이라 다 안됌 ^.^ 다시할당도 불가
a=ro as number[]; // but 타입단언을 통한 오버라이드 가능

/* 
readonly 와 const
변수에서 사용할지 프로퍼티에서 사용할지 구분
변수에서 사용할때는 const
프로퍼티에서 사용할때는 readonly
*/

/* 
객체 리터럴은 다른 변수에 할당하거나 인수로 전달할 때 특별한 처리를 받아 
프로퍼티 초과 검사(Excess Property Checks) 를 거칩니다. ?.?
*/

/* 함수 타입(Function Types) */

interface SearchFunc{
    (source : string, subString:string): boolean;
}

let mySearch: SearchFunc;
// mySearch = function(src: string, sub: string): boolean {
mySearch = function(source:string, subString:string){
    let result = source.search(subString);
    return result>-1;
}

//search메서드 : 정규식 검색에서 첫 번째 부분 문자열 일치를 찾습니다.

/*인덱싱 가능 타입(Indexable Types) 
인덱싱 가능 타입에는 객체로 인덱싱 하는 데 사용할 수 있는 타입과 인덱싱 할 때 해당 반환 타입을 설명
*/
interface StringArray{
    [index:number]: string;
}

let myArray:StringArray;
myArray = ["Bob", "Fred"];
let myStr:string = myArray[0];
//어렵다.!

class Animal{
    name:string;
}

class Dog extends Animal{
    breed:string;
}

interface NotOkay{
    // [x:number]: Animal; //오류.. 왜?ㅠㅠ
    [x:string]: Dog; 
}

interface NumberDictionary{
    [index:string]:number;
    length:number;
    // name:string;//string 형식의 name속성을 문자열 index형식 number에 할당 불가
}

//인덱스에 할당되지 않도록 인덱스 시그니처를 읽기 전용으로 만든다.
interface ReadonlyStringArray{
    readonly [index:number]: string;
}

let myArray2:ReadonlyStringArray=["Alice", "Bob"];
// myArray2[2] = "Mallory"; //인덱스 시그니처가 읽기 전용이므로 설정 불가

/* 클래스 타입(Class Types) 
인터페이스 구현(Implementing an interface)
이것도 뭔소리다냐..
*/

interface ClockInterface{
    currentTime:Date;
    setTime(d:Date); //인터페이스 메서드
}

class Clock implements ClockInterface{
    currentTime: Date;
    setTime(d:Date){
        this.currentTime = d;
    }
    constructor(h:number,m:number){}
}


/* 클래스의 스태틱과 인스턴스의 차이점 
class : 스태틱 측면의 타입과 인스턴스 측면의 타입으로 인터페이스 만들고
이 인터페이스를 구현하는 클래스를 생성하려고 하면 오류가 발생할 수 있다.
왜냐하면 클래스가 인터페이스를 구현할 때 클래스의 인스턴스 측면만 검사되기 때문입니다.
생성자는 정적인 측면이기 때문에 이 검사에 포함되지 않습니다.
*/

// interface ClockConstructor{
//     new (hour:number, minute:number);
// }

// class Clock2 implements ClockConstructor{
//     currentTime: Date;
//     constructor(h:number, m:number){}
// }

/* 대신 클래스의 정적인 측면에서 직접 작업해야 합니다. wow어렵당*/
interface ClockConstructor2{
    new (hour:number, minute:number): ClockInterface2;
}

interface ClockInterface2{
    tick();
}

function createClock( ctor: ClockConstructor2, hour: number, minute: number):ClockInterface2{
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface2{
    constructor(h:number, m:number){}
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface2{
    constructor(h:number, m:number){}
    tick(){
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12,17);
let analog = createClock(AnalogClock, 12,17);


/* 인터페이스 확장(Extending Interfaces) 
인터페이스를 재사용 가능한 컴포넌트로 분리하는 방법
*/

interface Shape{
    color:string;
}

interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke{
    sideLength: number;
}
//타입 단언 (Type assertions) TS야 나 믿지? 검사하지마~ 라는뜻
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


/* 하이브리드 타입(Hybrid Types) */

interface Counter{
    (start:number):string;
    interval:number;
    reset():void;
}

function getCounter():Counter{
    let counter = <Counter>function(start:number){};
    counter.interval = 123;
    counter.reset=function(){};

    return counter;
}
//함수와 객체 역할을 모두 하는 객체
let c = getCounter();
c(10);
c.reset();
c.interval=5.0;


/* 인터페이스 확장 클래스(Interfaces Extending classes) */

class Control{
    private state:any;
}

interface SelectableControl extends Control{
    select(): void;
}
//state는 private 멤버이기 때문에 Control의 자식만 SelectableControl을 구현할 수 있다
class Button extends Control implements SelectableControl{
    select(){}
}
class TextBox extends Control{
    select(){}
}
//Button과 TextBox 클래스는 SelectableControl의 하위 타입
//오류 mage타입의 state프로퍼티가 없다. (왜냐하면 둘 다 Control을 상속받으며 select 메서드를 가지기 때문)
// class mage implements SelectableControl{
//     select(){}
// }
/* don't understand~ 
인덱싱 가능 타입
클래스의 스태틱과 인스턴스의 차이점
하이블디ㅡ..
그냥 뭐.. 다.. 쥬륵
또 복습하기로이만
뿅!
참고 : https://typescript-kr.github.io/pages/Interfaces.html
*/