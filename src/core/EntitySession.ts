import { Entity } from './index';

type EntitySessionCommand = 'set' | 'add' | 'sub';

/**
 * Use this in case you need to keep track of atomic operations for a database.
 */
export class EntitySession<T extends Record<any, any>> {

    private readonly _entity: Entity<T>;
    private readonly _initialState: T;
    private readonly _currentState: Record<any, any>;
    private readonly _changes: Array<{ command: EntitySessionCommand, key: keyof T, value: T[keyof T]  }>;
    
    private constructor(entity: Entity<T>) {
        this._entity = entity;
        this._changes = [];
        this._initialState = Object.freeze({ ...this._entity.props });
        this._currentState = { ...this._initialState };
    }

    private _mutate(command: EntitySessionCommand, propName: keyof T, value: T[keyof T], preserveOriginal = false) {
        let mock = this._currentState[propName];
        
        switch (command) {
        case 'set':
            mock = value;
            break;
        case 'add':
            mock += value;
            break;
        case 'sub':
            mock -= value;
            break;
        default: throw new Error('Invalid command');
        }
        
        if(!preserveOriginal)
            this._entity.props[propName] = mock;
        this._currentState[propName] = mock;
    }

    public mutate(propName: keyof T, value: T[keyof T], command: EntitySessionCommand = 'set', preserveOriginal = false): void {
        // eslint-disable-next-line no-prototype-builtins
        if(!this._entity.props.hasOwnProperty(propName))
            throw new Error(`Property "${propName}" does not exist on entity "${Reflect.getPrototypeOf(this._entity)?.constructor.name}".`);

        if(typeof value !== typeof this._entity.props[propName])
            throw new Error(`Property "${propName}" is not of type "${typeof this._entity.props[propName]}".`);
        if(typeof value !== 'number' && (command === 'sub' || command === 'add'))
            throw new Error('Commands "set" and "sub" require a number as value');

        this._mutate(command, propName, value, preserveOriginal);
        this._changes.push({ command, key: propName, value });
    }

    get initialState() {
        return this._initialState;
    }

    get currentState() {
        return this._currentState;
    }

    get mutationsView() {
        const setChanges = this._changes.filter(change => change.command === 'set');
        return setChanges.reduce((acc, change) => {
            acc[change.key] = change.value;
            return acc;
        }, {} as Partial<T>);
    }

    get atomicOperations() {
        const atomics = this._changes.filter(change => change.command === 'add' || change.command === 'sub');

        const atomicsPerProperty = atomics.reduce((acc, change) => {
            if(!acc[change.key])
                acc[change.key] = [];
            acc[change.key].push(change);
            return acc;
        }, {} as {  [P in keyof T]: Array<{ command: EntitySessionCommand, value: T[keyof T] }> });

        return Object.keys(atomicsPerProperty).reduce((acc, key) => {
            const current = atomicsPerProperty[key];

            acc[key] = current.reduce((acc, change) => {
                if (change.command === 'add')
                    acc += change.value;
                else
                    acc -= change.value;
                return acc;
            }, 0);

            return acc;
        }, {} as { [key: string]: number });
    }

    public static from<T>(entity: Entity<T>) {
        return new EntitySession<T>(entity);
    }

    get entityId() {
        return this._entity.getId();
    }

}
