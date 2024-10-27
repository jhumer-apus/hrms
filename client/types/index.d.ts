export interface PreviousEmployer {
    key: string | number
    company_name: string,
    tin: number,
    address: string,
    zip_code: number
}

export interface FamilyMembers {
    first_name: string
    middle_name: string
    last_name: string
    occupation: string
    birth_date: Date
}

export interface RoutesTypes extends SubRoutesTypes {
    sub: SubRoutesTypes[] | null | []
}

export interface SubRoutesTypes {
    name: string,
    icon: any,
    link: string | "",
}

export type ActionType = "close" | "edit" | "cancel" | "save" | "delete"
