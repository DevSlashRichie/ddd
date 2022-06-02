import { AggregateRoot } from '../AggregateRoot';
import { IDomainEvent } from './IDomainEvent';
import { EntityId } from '../index';
import { Logger } from '../../logger';

type EventHandler = (event: IDomainEvent) => void;

export class DomainEvents {

    private static handlersMap: Record<string, Array<EventHandler>> = {};
    private static markedAggregates: Array<AggregateRoot<unknown>> = [];

    public static findMarkedAggregateByID(id: EntityId): AggregateRoot<unknown> | null {
        for (const aggregate of this.markedAggregates)
            if (aggregate.getId().eq(id))
                return aggregate;
        return null;
    }

    public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.getId());
        if (!aggregateFound)
            this.markedAggregates.push(aggregate);
    }

    private static dispatch(event: IDomainEvent) {
        const eventClassName: string = event.constructor.name;
        // eslint-disable-next-line no-prototype-builtins
        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers = this.handlersMap[eventClassName];
            for (const handler of handlers) {
                handler(event);
            }
        }

        Logger.info('[Domain Event Dispatched]: ' + eventClassName);
    }

    private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
        Logger.info('[Domain Event Aggregate Dispatched]: ' + aggregate.constructor.name);
        aggregate.domainEvents.forEach(event => this.dispatch(event));
    }

    private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<unknown>) {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.getId());
        if (aggregateFound)
            this.markedAggregates.splice(this.markedAggregates.indexOf(aggregate), 1);
    }

    public static dispatchEventsForAggregate(aggregateId: EntityId) {
        const aggregate = this.findMarkedAggregateByID(aggregateId);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }

    public static dispatchSingleEvent(filter: (aggregateRoot: AggregateRoot<any>) => boolean, eventFilter: (event: IDomainEvent) => boolean) {
        const aggregate = this.markedAggregates.find(filter);
        if (aggregate) {
            const event = aggregate.domainEvents.find(eventFilter);
            if (event) {
                this.dispatch(event);
                // RemoveEvent
                aggregate.domainEvents.splice(aggregate.domainEvents.indexOf(event), 1);
                if(aggregate.domainEvents.length === 0)
                    this.removeAggregateFromMarkedDispatchList(aggregate);
            }
        }
    }

    public static register(callback: EventHandler, eventClassName: string) {
        // eslint-disable-next-line no-prototype-builtins
        if (!this.handlersMap.hasOwnProperty(eventClassName))
            this.handlersMap[eventClassName] = [];
        this.handlersMap[eventClassName].push(callback);
    }

}