
export default function isCancelled(actions, toCancel) {
  return actions.some(action => toCancel.has(action.type));
}
