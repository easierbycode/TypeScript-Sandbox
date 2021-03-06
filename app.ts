
// Decorator factory
// - the fn it returns is decorator
// - this approach allows outer factory function to accept params
//   which can be used by inner decorator function
function Logger(logMessage: string) {
  // Logger Fn will receive Person class constructor as arg
  return function(ctxFn: Function) {
    console.log(logMessage);
    console.log('!!! Logging !!!');
  }
}
  
@Logger('[LOGGING]  Person')
class Person {
  name = 'Max';
  
  constructor() {
    console.log('creating person ...')
  }
}


const pers = new Person();