export const initState: any = {
  profile: null,
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
    default:
      return state
  }
}

export default ProfileStore
