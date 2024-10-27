"use client";

import React, { useEffect, useState } from 'react';
import { Button, Select, Space, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Payroll from '@/components/employees/Payroll';
import GovernmentContribution from '@/components/employees/GovernmentContribution';
import BIR from '@/components/employees/BIR';
import FamilyBackground from '@/components/employees/FamilyBackground';
import EmploymentHistory from '@/components/employees/EmploymentHistory';
import FormPersonalInfo from '@/components/employees/forms/FormPersonalInfo';

export default function AddNewEmployee() {

    const [currSection, setCurrSection] = useState<string>('personal-info');

    const [employeeDetails, setEmployeeDetails] = useState({
      first_name: null,
      middle_name: null,
      last_name: null,
      suffix: null,
      birth_date: null,
      sex: null,
      civil_status: null,
      spouse_first_name: null,
      spouse_middle_name: null,
      spouse_last_name: null,
      spouse_suffix: null,
      mobile_number: null,
      email_address: null,
      emerg_contact_person: null,
      emerg_contact_number: null,
      sss_no: null,
      philhealth_no: null,
      pagibig_no: null
    })

    const isRequireFieldFilled: boolean = 
      employeeDetails.first_name && 
      employeeDetails.middle_name &&
      employeeDetails.last_name &&
      employeeDetails.suffix &&
      employeeDetails.birth_date && 
      employeeDetails.sex &&
      employeeDetails.civil_status &&
      employeeDetails.spouse_first_name &&
      employeeDetails.spouse_middle_name &&
      employeeDetails.spouse_last_name &&
      employeeDetails.spouse_suffix &&
      employeeDetails.mobile_number &&
      employeeDetails.emerg_contact_person &&
      employeeDetails.emerg_contact_number ? true : false

    
    const handleChangeKey = (value: string) => {
        setCurrSection(curr => value)
    };

      
    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Personal Information',
        children: <div>hi</div>
      },
      {
        key: '2',
        label: 'Payroll Information',
        children: 
          <Payroll 
            employeeDetails={employeeDetails}
            setEmployeeDetails={setEmployeeDetails}
          />,
      },
      {
        key: '3',
        label: 'Government Contribution',
        children: 
          <GovernmentContribution
            employeeDetails={employeeDetails}
            setEmployeeDetails={setEmployeeDetails}
          />,
      },
      {
        key: '4',
        label: 'BIR',
        children: 
          <BIR
            employeeDetails={employeeDetails}
            setEmployeeDetails={setEmployeeDetails}
          />,
      },
      {
        key: '5',
        label: 'Family Background',
        children: 
          <FamilyBackground
            employeeDetails={employeeDetails}
            setEmployeeDetails={setEmployeeDetails}
          />,
      },
      {
        key: '6',
        label: 'Employment History',
        children: 
          <EmploymentHistory
            employeeDetails={employeeDetails}
            setEmployeeDetails={setEmployeeDetails}
          />,
      },
    ];

    return (
        <div className='w-full p-4 flex justify-center'>

          {/* center this div */}
          <div 
            className='w-full md:max-w-6xl bg-white p-4 shadow-xl overflow-y-auto h-full'
            >
            
            <Button 
              type="primary" 
              htmlType="submit" 
              disabled={!isRequireFieldFilled}
              className='my-4 wrap'
            >
              Submit Employee Information
            </Button>

            <Tabs 
              defaultActiveKey="1"  
              // activeKey={currSection}
              items={items} 
              onChange={handleChangeKey}
              className='w-full'
            />
          </div>

        </div>
    )
}