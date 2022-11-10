import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  activities: [],
  home_obj: null,

  home_Loading: false,
  fetch_Home_Loading: false,
  home_Error: "",
  activities_Loading: false,
  fetch_Activities_Loading: false,
  activities_Error: "",
  user_tree: {},
  notification: false,
};

const fetchHomeStart = (state, action) => {
  return updateObject(state, { fetch_Home_Loading: true });
};

const fetchHomeSuccess = (state, action) => {
  console.log("actions of home", action);
  return updateObject(state, {
    fetch_Home_Loading: false,
    home_obj: action.home,
    count: action.count,
  });
};

const fetchUserTreeData = (state, action) => {
  console.log("actions USER TREEEEE", action);
  return updateObject(state, {
    fetch_Home_Loading: false,
    user_tree: action.home,
    count: action.count,
  });
};

const fetchBusinessCardData = (state, action) => {
  // console.log("actions USER TREEEEE",action)
  return updateObject(state, {
    fetch_Home_Loading: false,
    businessData: action.businessData,
    count: action.count,
  });
};

const fetchHomeFail = (state, action) => {
  return updateObject(state, {
    fetch_Home_Loading: false,
    home_Error: action.error,
  });
};

const fetchActivitiesStart = (state, action) => {
  return updateObject(state, { fetch_Activities_Loading: true });
};

const fetchActivitiesSuccess = (state, action) => {
  console.log("actions of activities", action);
  return updateObject(state, {
    fetch_Activities_Loading: false,
    activities_obj: action.activities,
  });
};
const fetchActivitiesFail = (state, action) => {
  return updateObject(state, {
    fetch_Activities_Loading: false,
    activities_Error: action.error,
  });
};

const fetchTodoStart = (state, action) => {
  return updateObject(state, { fetch_todo_Loading: true });
};

const fetchTodoSuccess = (state, action) => {
  // console.log("actions of activities", action);
  return updateObject(state, {
    fetch_todo_Loading: false,
    todo_obj: action.todo,
  });
};

const fetchNotificationStatus = (state, action) => {
  return updateObject(state, { notification: action.data });
};

const reducer = (state = initialState, action) => {
  // console.log("initialState", action);
  switch (action.type) {
    case actionTypes.HOME_START:
      return fetchHomeStart(state, action);
    case actionTypes.HOME_SUCCESS:
      return fetchHomeSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return fetchHomeFail(state, action);
    case actionTypes.USER_TREE:
      return fetchUserTreeData(state, action);
    case actionTypes.BUSINESS_CARD:
      return fetchBusinessCardData(state, action);

    case actionTypes.ACTIVITIES_START:
      return fetchActivitiesStart(state, action);
    case actionTypes.ACTIVITIES_SUCCESS:
      return fetchActivitiesSuccess(state, action);
    case actionTypes.ACTIVITIES_FAIL:
      return fetchActivitiesFail(state, action);

    case actionTypes.TODO_START:
      return fetchTodoStart(state, action);
    case actionTypes.TODO_SUCCESS:
      return fetchTodoSuccess(state, action);

    case actionTypes.NOTIFICATION_STATUS:
      return fetchNotificationStatus(state, action);

    default:
      return state;
  }
};

export default reducer;
