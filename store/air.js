export const state = () => ({
    history: []
})
export const mutations = {
    addHistory(state, data) {
        state.history.unshift(data)
        if (state.history.length >= 5) {
            state.history.pop(data)
        }
    }
}