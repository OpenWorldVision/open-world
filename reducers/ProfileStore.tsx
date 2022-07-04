export const initState: any = {
  profile: null,
  openBalance: 0,
}

const ProfileStore = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        ...action.payload,
      }
    case 'SET_PROFESSION':
      return {
        ...state,
        profile: {
          ...state.profile,
          _profession: action.payload.profession,
        },
      }
    case 'SET_OPEN_BALANCE': {
      return {
        ...state,
        openBalance: action.payload,
      }
    }
    default:
      return state
  }
}

export default ProfileStore
