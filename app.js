var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function Validate(obj) {
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!Validate(createdCourse)) {
        alert('Invalid input 👎');
        return;
    }
    console.log(createdCourse);
});
function Autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    // modified propertyDescriptor
    const adjDescriptor = {
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
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
function PropertyDecorator(target, propertyName) {
    console.log('-= Property =-');
    console.log(target, propertyName);
}
function AccessorDecorator(target, name, descriptor) {
    console.log('-= Accessor =-');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function MethodDecorator(target, name, descriptor) {
    console.log('-= Method =-');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function ParamDecorator(target, name, position) {
    console.log('-= Param =-');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    PropertyDecorator
], Product.prototype, "title", void 0);
__decorate([
    AccessorDecorator
], Product.prototype, "price", null);
__decorate([
    MethodDecorator,
    __param(0, ParamDecorator)
], Product.prototype, "getPriceWithTax", null);
// Decorator factory
// - the fn it returns is decorator
// - this approach allows outer factory function to accept params
//   which can be used by inner decorator function
function Logger(logMessage) {
    console.log('-= Logger =-');
    // Logger Fn will receive Person class constructor as arg
    return function (ctxFn) {
        console.log(logMessage);
        console.log('!!! Logging !!!');
    };
}
function WithTemplate(template, hookId) {
    console.log('-= WithTemplate =-');
    // return function(ctxFn: Function) {
    return function (ctxFn) {
        // by naming param '_', ts knows we will not be using it, and will not complain
        // return function(_: Function) {
        return class extends ctxFn {
            // renaming args -> _ to avoid ts nag
            constructor(..._) {
                super();
                console.log('!!! Templating !!!');
                const hookEl = document.getElementById(hookId);
                const pers = new ctxFn();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('b').textContent = pers.name;
                }
            }
        };
    };
}
// decorators run from bottom up (@WithTemplate will run before @Logger)
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('creating person ...');
    }
};
Person = __decorate([
    Logger('[LOGGING]  Person'),
    WithTemplate('Hello from <b>Person</b>', 'app')
], Person);
const pers = new Person();
