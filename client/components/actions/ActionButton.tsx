import { Button, ConfigProvider, Popover } from "antd";
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from "react-icons/fa";

interface Props {
    actionType: "view" | "edit" | "delete"
    actionFn: () => void
    title: string  
}

export default function ActionButton(props: Props) {
    const { actionType, actionFn, title } = props

    const actionButton = () => {

        switch(actionType) {

            case "view":
                
                return (
                    <Button onClick={() => actionFn()} type="primary" ghost>
                        <FaRegEye />
                    </Button>
                )

            case "edit":
                return (
                    <Button onClick={() => actionFn()}>
                        <FaRegEdit />
                    </Button>
                )

            case "delete": 
                return (
                    <Button onClick={() => actionFn()} type="primary" danger ghost>
                        <FaRegTrashAlt />
                    </Button>
                )
        }
    }

    const overlayStyle = {
        color:"white",
        background: "black"
    }
    return (
        <ConfigProvider
            theme={{
                token: {
                    // colorBgElevated: "black",
                    // colorText: "white"
                },
                components: {
                    Popover: {
                        titleMinWidth: 50,
                        // colorBgElevated: "black",
                    },
                },
            }}
        >
            <Popover 
                title={title}
            >
                <div>
                    {actionButton()}
                </div>
            </Popover>
        </ConfigProvider>
    )
}