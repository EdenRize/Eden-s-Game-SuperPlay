import React from 'react'
import { Routes, Route } from 'react-router'
import 'animate.css';
import { HomePage } from './views/HomePage';



export function RootCmp() {
    return (
        <section className="app">
            <Routes>
                <Route element={<HomePage />} path="/" />
            </Routes>
        </section>
    )
}


