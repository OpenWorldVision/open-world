export const initState: any = {
    isOpen: true
  }

  const IsOpenEntryPage = (state = initState, action) => {
    switch (action.type) {
      case 'UPDATE_IS_OPENING':
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
  }

  export default IsOpenEntryPage