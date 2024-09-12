import React from "react";
import TopHeader from "./TopHeader";
import LeftSidebar from "./levelOne/LeftSidebar";
import Footer from "./levelTwo/Footer";
import { Outlet } from "react-router-dom";
export default function GlobalLayout({children}){
    return (
        <div id="global-layout">
            <TopHeader />
                <main id="main-content">
                    <LeftSidebar />
                    <Outlet />
                    {children}
                </main>
            <Footer />
        </div>
    )
}