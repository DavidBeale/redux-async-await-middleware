
export default async function relayActions(next, actions) {
    if (actions instanceof Error) {
        throw actions;
    }

    if (actions) {
        if (Array.isArray(actions)) {
            return Promise.all(
                actions.map(async action => next(action));
            );
        }

        return next(actions);
    }
}
