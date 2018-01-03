import isCancelled from './isCancelled';
import relayActions from './relayActions';


export default async function handler(action, dispatch, toCancel) {
    if (!action) {
        return action;
    }

    if (action instanceof Error) {
        throw action;
    }

    const actions = Array.isArray(action) ? action : [action];

    if (isCancelled(actions, toCancel)) {
        actions.forEach(actionItem => toCancel.delete(actionItem.type));
        return actions;
    }

    return relayActions(dispatch, actions);
}
