import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Upload', path: '/upload' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'Discord', icon: FaDiscord, url: 'https://discord.com' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">MemeVerse</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your one-stop destination for the dankest memes on the internet.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="text-gray-600 dark:text-gray-400">
              {footerLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link
                    to={link.path}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {currentYear} MemeVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
