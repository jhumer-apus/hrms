import { useState } from "react"

export default function Autocomplete() {
    const rows = [
        {
            id: 1,
            name: "Abakada"
        },
        {
            id: 2,
            name: "Barakuda"
        },
        {
            id: 3,
            name: "Alolos"
        },
        {
            id: 4,
            name: "Batak"
        }
    ]

    const [results, setResults] = useState<any>([])

    const handleSearch = (e:any) => {

        const val = e.target.value
        
        const results = rows.filter((item, index:number) => {
            const lowerCaseItemName = item.name.toLowerCase()
            const lowerCaseVal = val.toLowerCase()
            return lowerCaseItemName.includes(lowerCaseVal)
        })

        setResults((curr:any) => results)
    }
    return (
        <div>
            <div>
                <input className="outline-none" type="text" onChange={handleSearch}></input>
            </div>
            <div>
                <ul>
                    {results.map((item:any, index:number) => (
                       <li className="p-2" key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}