/// <reference path='base-component.ts' />


namespace App {

// ProjectItem class
// interfaces not only defines custom object types, but can define a contract on a class
export class ProjectItem 
extends Component<HTMLUListElement, HTMLLIElement> 
implements Draggable {
    
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} people`;
        }
    }
    
    constructor(hostId: string, private project: Project) {
        super('single-project', hostId, false, project.id);

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
        // dataTransfer property exists on drag events
        // it allows you to attach data to the 
        //   drag event which you can access on drop
        event.dataTransfer!.setData('text/plain', this.project.id);
        // effectAllowed updates cursor during drag event
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
        console.log('!!! drag end !!!');
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

}
