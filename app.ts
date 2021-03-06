interface ValidatorConfig {
  [property: string]: {
    [validateableProp: string]: string[]  // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  };
}

function Validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }

  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!Validate(createdCourse)) {
    alert('Invalid input 👎');
    return;
  }
  console.log(createdCourse);
});




function Autobind(target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  // modified propertyDescriptor
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // binding below allows this.message (in Printer) to work correctly when
      // button is clicked
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };

  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);




function PropertyDecorator(target: any, propertyName: string | Symbol) {
  console.log('-= Property =-');
  console.log(target, propertyName);
}

function AccessorDecorator(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('-= Accessor =-')
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function MethodDecorator(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('-= Method =-');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function ParamDecorator(target: any, name: string | Symbol, position: number) {
  console.log('-= Param =-');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @PropertyDecorator
  title: string;
  private _price: number;

  @AccessorDecorator
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @MethodDecorator
  getPriceWithTax(@ParamDecorator tax: number) {
    return this._price * (1 + tax);
  }
}




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
  return function<T extends { new (...args: any[]): {name:string} }>(
    ctxFn: T
  ) {

  // by naming param '_', ts knows we will not be using it, and will not complain
  // return function(_: Function) {

    return class extends ctxFn {
      // renaming args -> _ to avoid ts nag
      constructor(..._: any[]) {
        super();

        console.log('!!! Templating !!!');

        const hookEl = document.getElementById(hookId);
        const pers = new ctxFn();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('b')!.textContent = pers.name;
        }
      }
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