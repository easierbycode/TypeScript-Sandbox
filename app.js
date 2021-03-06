var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var Product = /** @class */ (function () {
    function Product(t, p) {
        this.title = t;
        this._price = p;
    }
    Object.defineProperty(Product.prototype, "price", {
        set: function (val) {
            if (val > 0) {
                this._price = val;
            }
        },
        enumerable: false,
        configurable: true
    });
    Product.prototype.getPriceWithTax = function (tax) {
        return this._price * (1 + tax);
    };
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
    return Product;
}());
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
        console.log('!!! Templating !!!');
        var hookEl = document.getElementById(hookId);
        var pers = new ctxFn();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('b').textContent = pers.name;
        }
    };
}
// decorators run from bottom up (@WithTemplate will run before @Logger)
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Max';
        console.log('creating person ...');
    }
    Person = __decorate([
        Logger('[LOGGING]  Person'),
        WithTemplate('Hello from <b>Person</b>', 'app')
    ], Person);
    return Person;
}());
var pers = new Person();
