import {RENDER_HEADER, RENDER_HEADER_STATE} from '../actions/types'

export const RenderMenu = (id) => {
    return {
        type: RENDER_HEADER,
        payload: false
    }
}

export const RenderMenuState = () => {
    return {
        type: RENDER_HEADER_STATE
    }
}