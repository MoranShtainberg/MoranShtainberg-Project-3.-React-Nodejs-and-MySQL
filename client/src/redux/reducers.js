export const userInfoReducer = (state =[], action)=>{
    switch (action.type) {
        case "USER_INFO":
            return [{user_id:    action.user_id,
                              first_name: action.first_name,                              
                              username:   action.username,
                              isAdmin:    action.isAdmin
                            }
                    ];   
        default:
            return state;
    }
}