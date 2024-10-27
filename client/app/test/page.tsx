"use client"
import axios from "axios";
import { useEffect, useRef } from "react";

export default function Test() {
    // const latitude = 37.7749;
    // const longitude = -122.4194;  US

    // const latitude = 14.444307393764221;
    // const longitude = 121.00434249842048;
    

    // axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
    //     .then(res => {
    //         console.log(res.data)
    // })


    const printRef = useRef<any>();

const handlePrint = () => {
        // const printContent = printRef.current;
        // const originalContent = document.body.innerHTML;

        // // Append a style tag to hide the headers/footers if the browser supports it
        // const style = document.createElement('style');
        // style.media = 'print';
        // style.innerHTML = `
        //     @page {
        //         size: auto;
        //         margin: 0;
        //     }
        //     body {
        //         margin: 0;
        //         padding: 0;
        //     }
        // `;
        // document.head.appendChild(style);

        // document.body.innerHTML = printContent.outerHTML;
        // window.print();
        // document.body.innerHTML = originalContent;
        // document.head.removeChild(style); // Clean up the style tag
        // window.location.reload(); // Reload to re-bind React
    };

    return (
        <div>
            <div ref={printRef}>
                <p>This is the content that will be printed.</p>
            </div>
            <div>
                <p>This content will not be printed.</p>
            </div>
            <button onClick={handlePrint}>Print Div</button>

            <p>LOOOOOk</p>
        </div>
    )
}