export const initState: any = {
    isLoading: false
  }

  const IsLoadingStore = (state = initState, action) => {
    switch (action.type) {
      case 'UPDATE_IS_LOADING':
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
  }

  export default IsLoadingStore