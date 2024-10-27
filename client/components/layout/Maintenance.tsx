"use client";

import { Typography } from "antd";
import { BiErrorAlt } from "react-icons/bi";

export default function Maintenance() {
    const { Title, Paragraph, Text, Link } = Typography;

    return (
        <div>
            <div className="m-auto w-fit flex flex-col items-center">
                <BiErrorAlt className="text-red-500 text-[100px] md:text-[300px]"/>
                <Typography className="text-center">
                    <Title>Maintenance on the way</Title>
                </Typography>
            </div>
        </div>
    )
}