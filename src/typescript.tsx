// #3.0 call signature
// const add = (a: number, b: number) => a + b;
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;

// #3.1 overloading
//오버로딩은 함수가 여러개의 call signatures를 가지고 있을 때 발생시킨다.
type Add = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};
// const add: Add = (a,b) => a+b; //b가 string일 수도 있기 때문에 a와b를 더할 수 없다고 판단한다.
const add: Add = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
};

//오버로딩의 예시 (Nextjs)
Router.push("/home"); //1.string값으로 push
Router.push({
  //2.객체(object)형식으로 push
  path: "/home",
  state: 1,
});
 
//구현해보기
type Config{
    path: string,
    state: object
}

type Push = {
    (path:string):void
    (config:Config):void
}

const push:Push= (config)=>{
    if(typeof config === "string")
        console.log(config);
    else{
        console.log(config.path);//남은 config는 object가 되니까 자동완성기능이 생긴다 config.path, config.state
    }
}

//파라미터 개수가 다를 때
type Add = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number; //보통 a,b 그리고 a,b,c가 있을 경우에는 c는 옵션이다.
};
const add: Add = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
}; //자주쓰이는 경우는 아니다.
 

//#3.2 다형성(Polymorphism) : 여러가지 다른 구조(모양,형태)들
//이전 강의해서 하던것들이 이미 여러가지모양의 다형성을 해본 것이다.
type SuperPrint = {
  //   (arr: number[]): void;
  //   (arr: boolean[]): void;
  //   (arr: (number | boolean)[]): void;
  //concrete type : number, boolean, string, void, unknown
  //generic type : 타입의 placeholder같은 것이다. 타입스크립트가 값들을 보고 그 타입을 유추한다. 기본적으로 그 유추한 타입으로 call signature를 너에게 보여준다.
  //concrete type을 사용하는 것 대신 쓸 수 있다.
  //call signature을 작성 할 때, 여기 들어올 확실한 타입을 모를 때 generic을 사용한다.
  <T>(arr: T[]): T; //call signature가 제네릭을 받는다는 걸 알려주는 방법.
};


// const superPrint: SuperPrint = (arr) => {
//   arr.forEach((i) => console.log(i));
// };
const superPrint: SuperPrint = (arr) => arr[0];

const a = superPrint([1, 2, 3, 4]);
const b = superPrint([true, false, true]);
const c = superPrint([1, true]);
const d = superPrint([1, true, "string", 2]);

 

//#3.3 Generics Recap
//제네릭을 하나 더 추가하고 싶을 때
type SuperPrint = <T, M>(a: T[], b: M) => T;
//타입스크립트는 제네릭을 처음 인식했을 때와 제네릭의 순서를 기반으로 제네릭의 타입을 알게된다.


//#3.4 Conclusions *********************
type SuperPrint = <T>(a: T[]) => T;
const superPrint: SuperPrint = (a) => a[0]; //SuperPrint를 타입으로 사용하고있다.

// 위에 두줄 모두를 일반함수로 대체 할 수 있다. 다른방법으로 선언
function superPrint<T>(a: T[]) {
  return a[0];
}
//****************************************

const a = superPrint<boolean>([1, 2, 3]);
//에러가 나는 이유는 overwrite(덮어쓰기)했기 때문이다. 너가 타입스크립트에 명시해주고 있는 것이다. boolean이라고. 타입스크립트가 유추할 수 있게 하는게 가장 좋은데 경우에 따라서 너가 더 구체적으로 하고 싶을 때, 이렇게 할 수도 있어.
//내 제네릭은 boolean이야. 타입스크립트는 이제 요게 boolean이라는 것을 알게되고, boolean배열이되겠지.

//*****************************************
type Player<E> = {
  name: string;
  extraInfo: E;
};
//만약 너가 많은 것들이 있는 큰 타입을 하나 가지고있는데, 그 중 하나가 달라질 수 있는 타입이라면, 거기에 제네릭을 넣으면돼. 그러면 넌 그 타입을 많이 재사용 할 수 있겠지?

const nico: Player<{ favFood: string }> = {
  name: "nico",
  extraInfo: {
    favFood: "Kimchi",
  },
};

//다른 방법으로 선언하는게 더 있는데 영상을 참고바람!
