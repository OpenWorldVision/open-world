export const initState: any = {
    profile: null
  }

  const ProfileStore = (state = initState, action) => {
    switch (action.type) {
      case 'SET_PROFILE':
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
  }

  export default ProfileStore