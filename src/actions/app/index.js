// constants
export const types = {
  SET_STATUS: '__SET_STATUS__'
}

export function setStatus (status) {
  return {
    type: types.SET_STATUS,
    status
  }
}
