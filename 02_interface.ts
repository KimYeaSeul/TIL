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