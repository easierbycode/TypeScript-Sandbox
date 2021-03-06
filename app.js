var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Decorator factory
// - the fn it returns is decorator
// - this approach allows outer factory function to accept params
//   which can be used by inner decorator function
function Logger(logMessage) {
    // Logger Fn will receive Person class constructor as arg
    return function (ctxFn) {
        console.log(logMessage);
        console.log('!!! Logging !!!');
    };
}
function WithTemplate(template, hookId) {
    // return function(ctxFn: Function) {
    return function (ctxFn) {
        // by naming param '_', ts knows we will not be using it, and will not complain
        // return function(_: Function) {
        var hookEl = document.getElementById(hookId);
        var pers = new ctxFn();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('b').textContent = pers.name;
        }
    };
}
// @Logger('[LOGGING]  Person')
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Max';
        console.log('creating person ...');
    }
    Person = __decorate([
        WithTemplate('Hello from <b>Person</b>', 'app')
    ], Person);
    return Person;
}());
var pers = new Person();
