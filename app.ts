
// Logger Fn will receive Person class constructor as arg
function Logger(ctxFn: Function) {
    console.log('!!! Logging !!!');
  }
  
  @Logger
  class Person {
    name = 'Max';
    
    constructor() {
      console.log('creating person...')
    }
  }


  const pers = new Person();