
export default async function handler(action, dispatch, toCancel) {
    if (!action) {
        return action;
    }

    if (action instanceof Error) {
        throw action;
    }

    const actions = Array.isArray(action) ? action : [action];

    if (isCancelled(actions, toCancel)) {
        actions.forEach(action => toCancel.delete(action.type));
        return actions;
    } else {
        return relayActions(dispatch, actions));
    }
}
