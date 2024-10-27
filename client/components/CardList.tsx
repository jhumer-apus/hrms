import { capitalize } from "@/utils/format-text"
import { Button, Card, Input, Select } from "antd"
import { Fragment, PropsWithChildren, ReactElement, useState } from "react"

interface Props {
    dataList: any[],
    titleKey: string,
    excludeKeys: string[]
    onSearch: ((filter:FilterType) => void) | null
}

type FilterType = {
    searchText: string,
    column: string
}

export default function CardList(props: PropsWithChildren<Props>) {
    const { dataList = [], titleKey, excludeKeys, children, onSearch} = props
    const [filter, setFilter] = useState<FilterType>({
        searchText: "",
        column: ""
    })

    const cleanKey = (key:string) => {
        const splitKeys = key.split("_")
        const capitalizeKeys = splitKeys.map(key => capitalize(key))
        return capitalizeKeys.join(" ")
    }


    const handleSelectChange = (value: string ) => {
        setFilter(curr => ({
            ...filter,
            column: value
        }))
    }

    const handleChangeField = (e:any) => {
        setFilter(curr => ({
            ...filter,
            [e.target.name]: e.target.value
        }))
    }

    const searchElement = ():ReactElement => (
        <Fragment>
            {onSearch && 
                <div className="flex gap-4">
                    <Select
                        options={[]}
                        placeholder="Column"
                        onSelect={handleSelectChange}
                    >
                        
                    </Select>
                    <Input
                        onChange={handleChangeField}
                        name="searchText"
                        placeholder="Search"
    
                    />
                    <Button type="primary" onClick={() => onSearch(filter)}>Search</Button>
                </div>}
        </Fragment>
    )

    
    return (
        <div>
            {searchElement()}
            <div className="flex flex-wrap justify-center w-fit gap-4 mt-4">
                {
                    dataList.map((data,index) => (
                        <Card 
                            title={data[titleKey]} 
                            bordered={false} 
                            className="w-56 shadow-2xl" 
                            key={index}
                        >
                            {children}
                            {
                                Object.keys(data)
                                    .map((key:string, dataIndex:number) => !excludeKeys.includes(key) && (<p key={dataIndex}><b>{cleanKey(key)}</b>{`: ${data[key]}`}</p>)
                            )}
                        </Card>
                    ))
                }
            </div>
            
        </div>
    )
}