var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var registeredValidators = {};
function Required(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ['required'], _a));
}
function PositiveNumber(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ['positive'], _a));
}
function Validate(obj) {
    var objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    var isValid = true;
    for (var prop in objValidatorConfig) {
        for (var _i = 0, _a = objValidatorConfig[prop]; _i < _a.length; _i++) {
            var validator = _a[_i];
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
var Course = /** @class */ (function () {
    function Course(t, p) {
        this.title = t;
        this.price = p;
    }
    __decorate([
        Required
    ], Course.prototype, "title", void 0);
    __decorate([
        PositiveNumber
    ], Course.prototype, "price", void 0);
    return Course;
}());
var courseForm = document.querySelector('form');
courseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var titleEl = document.getElementById('title');
    var priceEl = document.getElementById('price');
    var title = titleEl.value;
    var price = +priceEl.value;
    var createdCourse = new Course(title, price);
    if (!Validate(createdCourse)) {
        alert('Invalid input 👎');
        return;
    }
    console.log(createdCourse);
});
function Autobind(target, methodName, descriptor) {
    var originalMethod = descriptor.value;
    // modified propertyDescriptor
    var adjDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            // binding below allows this.message (in Printer) to work correctly when
            // button is clicked
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
var Printer = /** @class */ (function () {
    function Printer() {
        this.message = 'This works!';
    }
    Printer.prototype.showMessage = function () {
        console.log(this.message);
    };
    __decorate([
        Autobind
    ], Printer.prototype, "showMessage", null);
    return Printer;
}());
var p = new Printer();
var button = document.querySelector('button');
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
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            // renaming args -> _ to avoid ts nag
            function class_1() {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                console.log('!!! Templating !!!');
                var hookEl = document.getElementById(hookId);
                var pers = new ctxFn();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('b').textContent = pers.name;
                }
                return _this;
            }
            return class_1;
        }(ctxFn));
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
