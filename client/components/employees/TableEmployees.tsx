
"use client";

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Pagination, Space, Table, TableColumnType, TableColumnsType, TableProps } from "antd";
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useRef, useState } from "react";
import CardList from '../CardList';
import ViewEmployeeInfo from './ViewEmployeeInfo';
import { useModalStore } from '@/store/modalStore';


interface DataType {
    id: any;
    key: React.Key;
    full_name: string;
    age: number;
}
type DataIndex = keyof DataType;

export default function TableEmployees() {


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const {setModal} = useModalStore((state: any) => state)
    const [selectedRow, setSelectedRow] = useState<any>(null)
  
    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex ) => 
    {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({

        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }:any) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => {
                    console.log(e.target.value)
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }}
                onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        close();
                    }}
                >
                    close
                </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),

        // onFilterDropdownOpenChange: (visible) => {
        //   if (visible) {
        //     setTimeout(() => searchInput.current?.select(), 100);
        //   }
        // },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
      });

    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            ...getColumnSearchProps('id'),
            // onFilter: (value, record) => record.id.startsWith(value as string),
            // filters: [
            //     {
            //       text: 'Joe',
            //       value: 'Joe',
            //     },
            //     {
            //       text: 'Category 1',
            //       value: 'Category 1',
            //       children: [
            //         {
            //           text: 'Yellow',
            //           value: 'Yellow',
            //         },
            //         {
            //           text: 'Pink',
            //           value: 'Pink',
            //         },
            //       ],
            //     },
            //     {
            //       text: 'Category 2',
            //       value: 'Category 2',
            //       children: [
            //         {
            //           text: 'Green',
            //           value: 'Green',
            //         },
            //         {
            //           text: 'Black',
            //           value: 'Black',
            //         },
            //       ],
            //     },
            //   ],
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            filterSearch: true,
            // onFilter: (value, record) => record.name.startsWith(value as string),
            ...getColumnSearchProps('full_name'),
            width: '30%',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            filterSearch: true,
            sorter: (a, b) => a.age - b.age
        }
    ];
      
    const data: DataType[] = [
        {
            id: 1,
            key: '1',
            full_name: 'John Brown',
            age: 32
        },
        {
            id: 2,
            key: '2',
            full_name: 'Jim Green',
            age: 42
        },
        {
            id: 3,
            key: '3',
            full_name: 'Joe Black',
            age: 32
        },
        {
            id: 4,
            key: '4',
            full_name: 'Jim Red',
            age: 32
        },
        {
            id: 5,
            key: '5',
            full_name: 'John Brown',
            age: 32
        },
        {
            id: 6,
            key: '6',
            full_name: 'Jim Green',
            age: 42
        },
        {
            id: 7,
            key: '7',
            full_name: 'Joe Black',
            age: 32
        },
        {
            id: 8,
            key: '8',
            full_name: 'Jim Red',
            age: 32
        },
        {
            id: 9,
            key: '9',
            full_name: 'John Brown',
            age: 32
        },
        {
            id: 10,
            key: '10',
            full_name: 'Jim Green',
            age: 42
        },
        {
            id: 11,
            key: '11',
            full_name: 'Joe Black',
            age: 32
        },
        {
            id: 12,
            key: '12',
            full_name: 'Jim Red',
            age: 32
        }
    ];
      
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    
    return (
        <div className='mt-4'>
            <div className='hidden md:block'>
                <Table 
                    pagination={
                        {
                            defaultCurrent: 1,
                            pageSize: 5, 
                            position: ["topCenter", "bottomCenter"],
                            showSizeChanger: false,
                            total: 100
                        }
                    }
                    columns={columns} 
                    dataSource={data} 
                    onChange={onChange}
                    onRow={(record, index) => (
                        {
                            onClick:(e:any) => { 
                                setSelectedRow((curr:any) => record)
                                setModal("showViewEmployeeModal", true)
                            }
                        }
                    )}
                />
            </div>

            {/* <Pagination 
                defaultCurrent={1} 
                pageSize={5}
                total={50} 
            /> */}
            
            <div className='block md:hidden'>
                <CardList 
                    titleKey='name'
                    dataList={data}
                    excludeKeys={['id', 'key']} 
                    onSearch={()=>null}               
                 />
            </div>

            <ViewEmployeeInfo userID={selectedRow?.id} />
        </div>
    )
}   