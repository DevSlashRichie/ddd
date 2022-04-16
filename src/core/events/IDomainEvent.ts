import { EntityId, EntitySession } from '../index';


export interface IDomainEvent {

    dateTimeOccurred: Date;

    getAggregateId(): EntityId;

}

export class StateDomainEvent<T> implements IDomainEvent {

    public readonly dateTimeOccurred: Date;
    public readonly state: EntitySession<T>;

    private constructor(state: EntitySession<T>) {
        this.dateTimeOccurred = new Date();
        this.state = state;
    }

    public getAggregateId(): EntityId {
        return this.state.entityId;
    }

    public get mutatedProps() {
        return Object.keys(this.state.initialState) // eslint-disable-next-line no-prototype-builtins
            .filter(value => this.state.currentState.hasOwnProperty(value));
    }

    public static fromSession<T>(state: EntitySession<T>): StateDomainEvent<T> {
        return new StateDomainEvent<T>(state);
    }

}