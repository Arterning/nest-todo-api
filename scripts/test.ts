class Person {
  private honor = [];
  constructor(public name: string) {}

  greet() {
    console.log(`hello , here is ${this.name}, my honor is ${this.honor}`);
  }

  addHonor(honor) {
    this.honor.push(honor);
  }
}

const add = function (a, b) {
  return a + b;
};

const main = async () => {
  console.log('hello world');
  // Person person = new Person('joe');
  /**
   * 对于 Person person = new Person('joe');，使用 const 关键字代替 Person。
   * 在 TypeScript 中，使用 const、let 或 var 来声明变量，不需要再次指定类型。
   */
  const person = new Person('joe'); // Use 'const' instead of 'Person'
  person.addHonor('Good Student');
  person.addHonor('Excellent Teacher');
  person.greet();

  console.log(add(23, 43));
};

main();
