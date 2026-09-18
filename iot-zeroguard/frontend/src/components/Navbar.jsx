import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Detection Dashboard', path: '/dashboard' },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700 shadow-sm'
                    : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-teal-500/10 p-2 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                            <Shield className="w-6 h-6 text-teal-400 group-hover:text-teal-300" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white group-hover:text-teal-400 transition-colors">
                            IoT <span className="text-teal-400">ZeroGuard</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-teal-400 ${location.pathname === link.path
                                        ? 'text-teal-400'
                                        : 'text-slate-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Right */}
                    <div className="flex items-center">
                        <Link
                            to="/dashboard"
                            className="bg-teal-500 hover:bg-teal-400 text-white font-medium px-6 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-teal-500/20"
                        >
                            Launch Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
