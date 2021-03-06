
// Decorator factory
// - the fn it returns is decorator
// - this approach allows outer factory function to accept params
//   which can be used by inner decorator function
function Logger(logMessage: string) {
  console.log('-= Logger =-');
  // Logger Fn will receive Person class constructor as arg
  return function(ctxFn: Function) {
    console.log(logMessage);
    console.log('!!! Logging !!!');
  }
}


function WithTemplate(template: string, hookId: string) {
  console.log('-= WithTemplate =-');
  // return function(ctxFn: Function) {
  return function(ctxFn: any) {

  // by naming param '_', ts knows we will not be using it, and will not complain
  // return function(_: Function) {

    console.log('!!! Templating !!!');

    const hookEl = document.getElementById(hookId);
    const pers = new ctxFn();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('b')!.textContent = pers.name;
    }
  }
}


// decorators run from bottom up (@WithTemplate will run before @Logger)
@Logger('[LOGGING]  Person')
@WithTemplate('Hello from <b>Person</b>', 'app')
class Person {
  name = 'Max';
  
  constructor() {
    console.log('creating person ...')
  }
}


const pers = new Person();