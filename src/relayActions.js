
export default async function relayActions(dispatch, actions) {
    return Promise.all(actions.map(async action => dispatch(action)));
}
