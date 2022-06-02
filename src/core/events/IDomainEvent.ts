import { Entity, EntityId, EntitySession } from '../index';

export interface ComplexEventProps {
    aggregate: Entity<any>;
    dateTimeOccurred: Date;
    version?: number;
}

export interface IDomainEvent {

    dateTimeOccurred: Date;

    getAggregateId(): EntityId;

}


export abstract class ComplexEvent<T extends ComplexEventProps> extends Entity<T> implements IDomainEvent {

    public readonly dateTimeOccurred: Date = new Date();

    protected constructor(props: T, id?: EntityId) {
        super(props, id);
    }

    public getAggregateId(): EntityId {
        return this.props.aggregate.getId();
    }

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