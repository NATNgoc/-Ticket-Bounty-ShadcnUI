import { create } from 'zustand'

type State = {
    isLogin: boolean
}

type Action = {
    updateLoginStatus: (isLogin: State["isLogin"]) => void
}

// Create your store, which includes both state and (optionally) actions
const useLoginStatusStore = create<State & Action>((set) => ({
    isLogin: false,
    updateLoginStatus: (isLogin) => set(() => ({ isLogin: isLogin }))
}))

export {
    useLoginStatusStore
}

