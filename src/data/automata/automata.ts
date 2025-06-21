import { combineReducers } from "redux";
import resourcesReducer from "./resources"
import propertiesReducer from "./properties"
import creaturesReducer from "./creatures"
import programsReducer from "./programs"
import guidesReducer from "./guides"
import marketReducer from "./market"

export default combineReducers({
    resources: resourcesReducer,
    properties: propertiesReducer,
    creatures: creaturesReducer,
    programs: programsReducer,
    guides: guidesReducer,
    market: marketReducer,
})