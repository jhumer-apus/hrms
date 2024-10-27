export interface PersonalInfoType {
    first_name: string | null,
    middle_name: string | null,
    last_name: string | null,
    suffix: string | null,
    birth_date: string | Date | null,
    sex: string | null,
    civil_status: string | null,
    spouse_first_name: string | null,
    spouse_middle_name: string | null,
    spouse_last_name: string | null,
    spouse_suffix: string | null,
    mobile_number: string | number | null,
    email_address: string | null,
    emerg_contact_person: string | null,
    emerg_mobile_number: string | null
    employee_image: any | null | undefined | string
}

export interface PayrollInfoType {
    computation_type: string | null
    rate: number | null
    bank_name: string | null
    account_number: string | null
}

export interface EmploymentInfoType {
    employee_number: string | number | null
    date_hired: Date | string | null
    company_id: number | null
    position_id: number | null
    role_id: number | null

}

export type FileUploadType = {
    file: {
        originalFileObj: File
    }
}


export type EmployeeDataType = PersonalInfoType & PayrollInfoType & EmploymentInfoType;

