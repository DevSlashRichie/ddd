import { IDomainEvent } from './IDomainEvent';
import { DomainEvents } from './DomainEvents';

export abstract class Subscriber<T extends IDomainEvent> {

    private readonly _eventName: string;

    protected constructor(eventName: string) {
        this._eventName = eventName;
    }
    
    private defaultConnect() {
        DomainEvents.register(event => this.handle(event as T), this._eventName);
    }

    public connect() : Promise<void> | void {
        this.defaultConnect();
    }
    
    public disconnect() : Promise<void> | void  {
        throw new Error('Not implemented'); 
    }
    
    public abstract handle(event: T) : void;
}