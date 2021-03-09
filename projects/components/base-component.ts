namespace App {

// Component base class
// abstract class cannot be instantiated
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string, 
        hostElementId: string, 
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
        this.hostElement = <T>document.getElementById(hostElementId)!;

        const importedNode = document.importNode(this.templateElement.content, true);
        // this.element is <form>
        this.element = importedNode.firstElementChild as U;
        if (newElementId)  this.element.id = newElementId;

        this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend', 
            this.element
        );
    }

    // abstract method does not define implementation, but requires classes which extend it to
    abstract configure(): void;
    abstract renderContent(): void;
}

}