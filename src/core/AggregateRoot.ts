import { Entity } from './Entity';
import { IDomainEvent } from './events';
import { Logger } from '../logger';

export class AggregateRoot<T> extends Entity<T> {
    private _domainEvents: Array<IDomainEvent> = [];

    get domainEvents(): Array<IDomainEvent> {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: IDomainEvent): void {
        this._domainEvents.push(domainEvent);
        this.logEvent(domainEvent);
    }

    private logEvent(domainEvent: IDomainEvent): void {
        const thiz = Reflect.getPrototypeOf(this);
        const domainEventClazz = Reflect.getPrototypeOf(domainEvent);
        Logger.info('[Domain Event Created]: ' + thiz?.constructor.name + '==>' + domainEventClazz?.constructor.name);
    }

    public clearEvents(): void {
        this._domainEvents = [];
    }

}
