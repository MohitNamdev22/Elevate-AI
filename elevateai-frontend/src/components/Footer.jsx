import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import elevateaiLogo from '../assets/elevateai-logo.svg';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo & Socials */}
                <div>
                    <div className="flex items-center space-x-3">

                        <img
                            src={elevateaiLogo}
                            alt="ElevateAI"
                            className="h-10 brightness-200 contrast-200" // Added filter utilities
                        />
                        <div>
                            <h2 className="text-white text-xl font-semibold">ElevateAI</h2>
                            <p className="text-sm">Empower your career</p>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-white"><FaLinkedin size={20} /></a>
                        <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
                        <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
                        <a href="#" className="hover:text-white"><FaGithub size={20} /></a>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Press</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Courses</a></li>
                        <li><a href="#" className="hover:text-white">Mentors</a></li>
                        <li><a href="#" className="hover:text-white">Projects</a></li>
                        <li><a href="#" className="hover:text-white">Events</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Legal</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Terms</a></li>
                        <li><a href="#" className="hover:text-white">Privacy</a></li>
                        <li><a href="#" className="hover:text-white">Cookies</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-6">
                2025 ElevateAI. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
