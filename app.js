var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Logger Fn will receive Person class constructor as arg
function Logger(ctxFn) {
    console.log('!!! Logging !!!');
}
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Max';
        console.log('creating person...');
    }
    Person = __decorate([
        Logger
    ], Person);
    return Person;
}());
var pers = new Person();
