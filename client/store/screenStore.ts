import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ScreenStore {
    screen: ScreenType,
}

type ScreenType = {
    width: number | null;
    height: number | null;
    setScreenSize: (screen:ScreenSizeType) => void;
}

type ScreenSizeType = {
    width: number | null
    height: number | null
}

export const useScreenStore = create<ScreenStore>()(
    immer(set => ({
        screen: {
            width: null,
            height:null,
            setScreenSize: (screen) => 
                set((state:any) => 
                    {
                        state.screen.width = screen.width,
                        state.screen.height = screen.height
                    }
                )
            }
        })
    )
)