"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const EntityId_1 = require("./values/EntityId");
/**
 * This class is used to build an Entity inside the business core.
 * @T Represents the props that will include this entity, remember this should only be primitive vars. or ValueObject.
 */
class Entity {
    constructor(props, id) {
        this._id = id ? id : new EntityId_1.EntityId();
        this.props = props;
    }
    /**
     * @returns the  id representing this EntityId
     * @see EntityId
     */
    getId() {
        return this._id;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map