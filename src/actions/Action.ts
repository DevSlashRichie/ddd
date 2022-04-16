import { OperationResult } from '../core/ErrorOperators/OperationResult';
import {GBuilder} from '../utilities';

/**
 * This action is used to build an DDD action. It includes all the the element required to build it.
 *
 * {@link OperationResult} will represent what is returning the action when executing it with execute.
 * @T Is the DTO that will include the elements used to execute this action.
 * @R Is the operation result that includes either a value or an expected error, make sure to use an error handler
 * that implements {@link OperationResult}.
 */
export interface Action<T, R extends OperationResult<any, any>> {

    /**
     * @async This is an async. operation.
     * Inside this method all the logic of the actions happens.
     * Used it to execute the action itself.
     * @param dto The elements used to build/execute this action.
     * @return returns an OperationResult handling what happened with this action.
     */
    execute(dto: T) : Promise<R>;
}

export abstract class SessionAction<T, R extends OperationResult<any, any>> implements Action<T, R> {

    protected abstract _execute(g: GBuilder, dto: T) : Promise<R>;

    async execute(dto: T): Promise<R> {
        const gbuilder = GBuilder.create(false);
        const operation = await this._execute(gbuilder, dto);
        if(!operation.isSuccess())
            await gbuilder.recover(true);
        return operation;
    }

}