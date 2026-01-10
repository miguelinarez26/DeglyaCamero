import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-body text-text-light dark:text-text-dark transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};
