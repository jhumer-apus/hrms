"use client";

import { Avatar, Button, Dropdown, Menu, MenuProps, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useRef, useState } from "react";
import { BiFace } from "react-icons/bi";
import useAuth from "@/hooks/auth";

import { GiHamburgerMenu } from "react-icons/gi";
import { useMenuStore } from "@/store/menuStore";
import { useScreenStore } from "@/store/screenStore";

export default function Header() {

    const { logout } = useAuth({
      middleware: 'auth',                     // 'guest' for non-authenticated users, or 'auth' for protected pages
      redirectIfAuthenticated: '/dashboard'    // Redirects if user is already authenticated
    });
    
    const {isShow, setIsShow} = useMenuStore((state) => state.sidebar)

    const {width: screenWidth, height: screenHeight, setScreenSize} = useScreenStore((state:any) => state.screen)
    
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Profile
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              Account
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <button onClick={() => logout()}>
              Logout
            </button>
          ),
        }
      ];
    return (
        <div className="bg-slate-100 h-16 w-full sticky z-10 top-0 flex items-center justify-between md:justify-end px-4">
            {
              screenWidth <= 768 &&
              <GiHamburgerMenu onClick={() => setIsShow(true)}/>
            }
            <div>
                <Dropdown className="cursor-pointer" menu={{ items }}  trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}