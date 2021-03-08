# Decorators
* decorators are evaluated when code is declared, not at run-time
  - i.e. decorators execute when a class is defined, not when it's instantiated

* decorators are evaluated bottom up (if multiple)


# Classes
* properties can be defined in the constructor by adding an accessor in front of param name
  - i.e. constructor(private fooBar: string)  <- this would add the class property `#fooBar`

* properties can be declared private using `#` as the first character  (will not work for methods)

* to ensure a singleton instance of a class, make constructor private, and store instance to a private static property
```
class ProjectState {
    private static instance: ProjectState;

    private constructor() {}

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }
}
```