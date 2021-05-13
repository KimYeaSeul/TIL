//기본타입

//부울(Boolean)형 true/false 반환
let isDone:boolean = false;

//숫자(Number)형 2/8/10/16 진수 지원
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

//문자열(String) 큰따옴표 또는 작은따옴표
let color: string = "blue";
color = 'red';

//템플릿문자열 백틱/백 쿼트(`) 문자로 감싸져 있으며 ${ 표현식 } 형식
// (`) 안에 문장형태 그대로 출력
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age+1} years old next month.`;
/* 위 코드는 아래 코드와 같다.
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
"I'll be " + (age + 1) + " years old next month."; 
*/

/*배열(Array)
1. 요소 타입의 배열을 나타내기 위해 [] 다음에 오는 요소의 타입을 사용. 요소타입[]
2. 제네릭 배열 타입을 사용. Array<요소의 타입>
*/
let list1: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];


/*튜플(Tuple)
고정된 개수의 요소 타입을 알고 있지만 반드시 같을 필요는 없는 배열 표현
*/
let x:[string, number];
x=["hello",10]; // 초기화
//x=[10,"hello"]; //할당 불가, 오류
console.log(x[0].substr(1));
//substr메서드:지정한 위체이서 시작하고 지정한 길이인 부분 문자열을 가져옴
//문자열.substr(시작문자열 인덱스[,반환되는 부분 문자열에 포함할 문자 수])
//console.log(x[1].substr(1));// 오류, number는 문자열이 없다!

//Union 타입 : 알려진 인덱스 집합 외부의 요소에 접근할 때 사용

x[3] = "world";// string은 string|number에 할당

console.log(x[5].toString());//x[5]는 숫자로 인식. string|number모두 포함
/*toString메서드:수를 문자열로 리턴
ex)
let num = new Number(10);
alert(num.toString()); // string, '10', 10진수
alert(num.toString(2)); // string,'1010', 2진수
alert(num.toString(8)); // string,'12', 8진수
alert(num.toString(16)); // string,'a', 16진수
*/
// x[6] = true; // boolean 은 string | number 이 아님

/* 열거(Enum)*/
enum Color {Yellow, Pink, Orange}
        //   0,   1   ,  2
//enum Color {Yellow=1, Pink=2, Orange=4}
        //      번호 매기기 가능!
let c:Color = Color.Pink; // 1 or 2
//enum 의 특징! 숫자 값에서 해당 값이름으로 이동 가능
enum Color {Red=1, Green, Blue}
        //       1,    2   ,  3
let colorName: string = Color[2];
alert(colorName);//Green 표시

/*Any : 변수의 타입을 설명할 수 없을 때 사용하는 타입 
타입 검사를 선택하지 않고 그 갓이 컴파일-타임 검사를 통과하도록 하고싶을때*/
let notSure: any = 4; // Number
notSure = "문자열일수도 있다"; // String
notSure = false; //Boolean

//객체 타입의 변수를 사용하면 해당 객체에는 값!만 할당할 수 있음.
//실제로 존재하는 것도 임의의 메서드를 호출할 수는 없다
notSure.ifItExists(); // ifItExists 가 존재할 수 있음.
notSure.toFixed(); // toFixed 존재할 수 있음.(컴파일러는 체크안함)

let prettySure: Object = 4;//객체에 값만 할당
prettySure.toFixed(); //'Object' 타입에 'toFixed' 프로퍼티는 존재하지 않습니다. 객체 타입에메서드 호출 불가!

//any타입은 일부를 알고 있는 경우에도 유용하지만 모두 그렇지는 않습니다.
//배열에는 다른 타입이 혼재되어 있다.
let list: any[] = [1,true,"free"];
list[1] = 100;

/*Void any와 다르게 어떤 타입의 부재도 전혀 없음. 
반환값을 반환하지 않는 함수의 반환 타입으로 볼 수 있다.(?)*/

function warnUser() : void{
    alert("This is my warning message");
}

//void 타입의 변수 선언은 undefined 또는 null 만 할당 가능. 유용x
let unusable: void = undefined;


/* NULL과 Undefined : void 와 마찬가지로 유용하지x*/
let u: undefined = undefined;
let n: null = null;

/* Never : 절대로 발생하지 않는 값의 타입
ex 함수표현식의 반환 타입이거나 항상 예외를 던지는 화살표 함수 표현식이거나 절대 반환하지 않는 표현식
모든 타입의 서브타입이며 모든 타입에 할당 가능.
어떤 타입도 never에 할당 불가능  */

//반환되는 함수에는 연결할 수 없는 end-point가 있어서는 안된다.
function error(message:string):never{
    throw new Error(message);
}
function infinitelLoop(): never{
    while(true){
        
    }
}
//추론되는 반환 타입은 절대로 없음
function fail() {
    return error("something failed");
}

/* 타입 단언(Type assertions) 
1. "angle-braket" 구문
2. as 구문
*/

let someValue1: any = "this is a string";
let strLength1: number = (<string>someValue1).length;

let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;

/* 
var : var가 하던 일을 let이 다 하게되어서 필요 없다.
let : var역활
const : 상수변수, 재 할당 불가   
[ change part! wait! ]
 */