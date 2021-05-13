/* https://typescript-kr.github.io/pages/Classes.html
practice class

*/

//class 기반 예제
class Greeter { //Greeter have 3 members
    greeting:string; //1.프로퍼티
    constructor(message: string){ //2.생성자
        this.greeting = message;
    }

    greet(){ //3.메서드
        //this는 class의 멤버를 참조하기 위해 쓰는 접두어.
        return "Hello,"+this.greeting;
    }
}
//new를 사용하여 class의 인스턴스 만듬. 객체화
let greeter = new Greeter("world");

//상속(Inheritance) 
class Animal {
    name: string;
    constructor(theName:string){ this.name = theName;}
    move(distanceInMeters:number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
//오버라이딩. 부모의 메서드를 자식이 아웅 해버림
class Snake extends Animal {
    constructor(name:string){super(name);}
    move(distanceInMeters = 5){
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name:string){super(name);}
    move(distanceInMeters = 45){
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom:Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

//public, private, protected

class Animal2 {
    private name:string;
    // protected name:string;
    constructor(theName:string) { this.name = theName; }
}
class Rhino extends Animal2{
    constructor(){ super("Rhino"); }
    // public getPitch(){return this.name;}
}

class Employee {
    private name: string;
    constructor(theName:string){this.name = theName; }
}

let animal = new Animal2("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino ; 

//readonly

class Octopus {
    readonly name:string;
    readonly numberOfLegs : number = 8;
    constructor(theName: string){
        //매개변수 프로퍼티에서 멤버 생성 및 초기화
        //constructor(readonly name: string)
        this.name = theName;
    }
}

let dad = new Octopus("Man with the 8 strong legs");
// dad.name = " rewrite error. name is readonly ";

//접근자 (Accessors)