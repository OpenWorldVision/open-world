export const initState = {
  isConnected: false
}

const IsConnectedStore = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_IS_CONNECTED':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default IsConnectedStore