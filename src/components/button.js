    import React from "react";
    import PropTypes from "prop-types";

    const Button = ({
        children,
        onClick,
        theme = "light",
        className = "",
        size = "md",
        rounded = true,
    }) => {
        // Determine button size styles
        const sizeClasses = {
            sm: "px-3 py-1 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-5 py-3 text-lg",
            xl: "px-16 py-6 text-xl",
        };

        // Base button style
        const baseStyle = `font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            rounded ? "rounded-lg" : "rounded-none"
        }`;

        // Theme-specific styles
        const themeClasses =
            theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500"
                : "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400";

        return (
            <button
                onClick={onClick}
                className={`${baseStyle} ${sizeClasses[size]} ${themeClasses} ${className}`}
            >
                {children}
            </button>
        );
    };

    // Prop types for better reusability
    Button.propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func,
        theme: PropTypes.oneOf(["light", "dark"]),
        className: PropTypes.string,
        size: PropTypes.oneOf(["sm", "md", "lg"]),
        rounded: PropTypes.bool,
    };

    export default Button;
