import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
} from "lucide-react";

const Footer = ({ theme }) => {
    const currentYear = new Date().getFullYear();

    const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
    const bgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
    const hoverColor = theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-900";

    return (
        <footer className={`${bgColor} ${textColor} w-full pt-24`}>
            {/* Main Footer */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className={`text-lg font-bold ${textColor}`}>TVC</h3>
                        <p className="text-sm">Ideate, Ascend, Lead</p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/yourusername"
                                className={`${hoverColor} transition-colors`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/edc_tiet/"
                                className={`${hoverColor} transition-colors`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/school/entrepreneurship-development-cell-thapar-university/"
                                className={`${hoverColor} transition-colors`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className={`text-lg font-bold ${textColor}`}>Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <MapPin size={16} />
                                <span>Thapar Institute of Engineering & Technology, Thapar Technology Campus, Bhadson Road, Patiala- 147004, Punjab</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone size={16} />
                                <span>+91 98882 88349 +91 89293 45416</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail size={16} />
                                <span>tuedcell@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300 w-full">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm">
                            © {currentYear} TVC. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
