import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type Menu = {
    sidebar: SideBarState
}

type SideBarState = {
    isShow : boolean,
    setIsShow: (val:boolean) => void
}

export const useMenuStore = create<Menu>()(
    immer(set => ({

        sidebar: {
            isShow: false,
            setIsShow: (val:boolean) => set((state) => { state.sidebar.isShow = val})
        },

    }))
);