export const state = () => ({
    userInfo: ''
})
export const mutations = {
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
}