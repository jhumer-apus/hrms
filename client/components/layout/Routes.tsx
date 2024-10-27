"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Menu } from 'antd';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { BiCategory, BiChevronLeft, BiChevronRight, BiGroup, BiSolidDashboard } from "react-icons/bi";
import BitverseLogo from '@/assets/bitverse-logo.png';
import { MenuProps } from 'antd/lib/menu';
import { usePathname, useRouter } from 'next/navigation';
import SidebarMobile from './sidebar/SidebarMobile';
import SidebarDesktop from './sidebar/SidebarDesktop';
import { GrUserAdmin } from 'react-icons/gr';
import { FaCcPaypal } from 'react-icons/fa';
import { RoutesTypes } from '@/types';
import { useScreenStore } from '@/store/screenStore';
import { RiPaypalFill } from 'react-icons/ri';
import { FaPesoSign } from 'react-icons/fa6';

type MenuItem = Required<MenuProps>['items'][number];

export default function SideBar() {

    const {width:screenWidth, height:screenHeight, setScreenSize} = useScreenStore((state: any) => state.screen)


    // Routes and menu items
    const routes: RoutesTypes[] = [
        {
            name: "Dashboard",
            icon: <BiSolidDashboard className='text-2xl' />,
            link: "/dashboard",
            sub: []
        },
        {
            name: "Admin Portal",
            icon: <GrUserAdmin className='text-2xl' />,
            link: "",
            sub: [
                {
                    name: "Categories",
                    icon: <BiCategory className='text-2xl'/>,
                    link: "/admin/categories"
                },
            ]
        },
        {
            name: "Employees",
            icon: <BiGroup className='text-2xl' />,
            link: "/employees",
            sub: []
        },
        {
            name: "Payrolls",
            icon: <FaCcPaypal className='text-2xl' />,
            link: "/payrolls",
            sub: [
                {
                    name: "Payslips",
                    icon: <FaPesoSign className='text-2xl'/>,
                    link: "/payrolls/payslips"
                },
                {
                    name: "Payroll Group",
                    icon: <RiPaypalFill className='text-2xl'/>,
                    link: "/payrolls/payroll-group"
                },
            ]
        }
    ];

    const handleResize = useCallback(() => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    },[setScreenSize])

    useEffect(() => {

        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        // Add event listener for resizing
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize, setScreenSize]);

    return (
        <div className=''>
            {screenWidth > 768 ? (
                <SidebarDesktop 
                    routes={routes}
                />
            ) : (
                <SidebarMobile 
                    routes={routes}
                />
            )}
        </div>
    );
};

