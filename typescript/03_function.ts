/* 클래스(Classes) */

//클래스 기반 예제
class Greeter{
    greeting:string;
    constructor(message:string){
        this.greeting = message;
    }
    greet(){
        return "Hello, " + this.greeting;
    }
}
//this 는 멤버에 접근한다는 뜻
// 클래스의 인스턴스 생성(객체생성)
let greeter = new Greeter("world");
//greeter.greet() => Hello, world

/* 상속(Ingeritance) 
객체 지향 패턴
기본 패턴 1. 상속을 사용하여 기존 클래스를 확장하여 새로운 클래스 생성
*/

class Animal{
    move(distanceInMeters:number = 0){
        console.log(`Animal mobed${distanceInMeters}m.`);
    }
}

class Dog extends Animal{
    bark(){
        console.log('Woof ! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

//복잡한 예제

class Animal2{
    name:string;
    constructor(theName:string){ this.name = theName;}
    move(distanceInMeters:number = 0){
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal2{
    constructor(name:string){ super(name); }
    move(distanceInMeters = 5){
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal2{
    constructor(name : string) { super(name); }
    move(distanceInMeters = 45){
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal2 = new Horse("Tommy the paloino");

sam.move();
tom.move(34);

/* Public, Private, Protected 지정자와 Readonly */

/*1. public by default
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
*/

/*2. private
멤버가 private로 표시되면 그 멤버를 포함하는 클래스의 외부에서는 접근 불가
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 오류: 'name'은 private이다;

호환성(compatible)이 있는 것으로 판단되는 두 가지 타입 중 private멤버가 있는 경우 
다른 멤버는 동일한 선언에서 유래된 private멤버가 있어야 합니다.
이것은 protected멤버에도 적용됩니다.

class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 오류: 'Animal'과 'Employee'는 호환되지 않습니다.
*/

/* protected
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
// Employee는 person에서 파생되었기 때문에 인스턴스 메서드 내에서 사용 가능
console.log(howard.getElevatorPitch());
console.log(howard.name); // 오류, 외부에서 사용할수 없음. 

//또 생성자를 protected로 표시하여 클래스를 포함하는 클래스 외부에서 클래스를 인스턴스화 할수는 없지만 확장할 수는 있음.
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee는 Person을 확장할 수 있습니다
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 오류: 'Person'의 생성자는 protected입니다.
*/

/* Readonly 지정자 
//읽기 전용 프로퍼티들은 선언 또는 생성자에서 초기화해야합니다.
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 오류! name은 readonly입니다.
*/

/* 매개변수 프로퍼티(Parameter properties) 
//위 코드와 비교
class Octopus{
    readonly numberOfLegs:number = 8;
    constructor(readonly name:string){ //<= 매개변수 프로퍼티를 활용하여 한곳에서 멤버 생성 및 초기화(선언&할당)

    }
}

*/

/* 접근자(Accessors) */

//객체의 멤버에 대한 접근을 인터셉트 하는 방법으로 getters/setters 지원

let passcode = "secret passcode";

class Employee{
   private _fullName:string;

   set fullName(newName: string){
       if(passcode && passcode == "secret passcode"){
           this._fullName = newName;
       }else{
           console.log("오류: employee의 무단 업데이트!");
       }
   }

   get fullName(): string{
       return this._fullName;
   }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if(employee.fullName){
    console.log(employee.fullName);
}

/* 접근자에 대해 알아야할 주의사항
1. 접근자를 사용하려면 ES5이상을 출력하도록 컴파일러를 설정해야한다.
2. get과 set을 가진 접근자는 자동적으로 readonly로 추론된다.
*/

/* 정적 프로퍼티(Static Properties): 클래스 자체에 볼 수 있음 */
class Grid{
    static origin = {x:0, y:0};
    calculateDistanceFromOrigin(point: {x:number; y:number;}){
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist* yDist) / this.scale;
    }

    constructor(public scale:number){}
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

console.log(grid1.calculateDistanceFromOrigin({x:10, y:10}));
console.log(grid2.calculateDistanceFromOrigin({x:10, y:10}));

/* 스태틱 메소드 vs 클래스 멤버
스태틱메소드 : new키워드를 안쓰고 접근 가능
클래스멤버 : 반드시 new키워드로 새 인스턴스를 생성하고 그걸로 접근
by sungmin
*/


//어려워 나중에 할래!!!!!!!!!!!

/* Q1. Protect와 Private의 차이점은? */