
export default function defaultCancelAction(action) {
    if (typeof action.type !== 'string') {
        return false;
    }

    let startPos = action.type.indexOf('/');
    startPos = startPos === -1 ? 0 : startPos + 1;

    if (action.type.substr(startPos, 7) === 'CANCEL_') {
        return action.type.substr(0, startPos) + action.type.substr(startPos + 7);
    }

    return false;
}
