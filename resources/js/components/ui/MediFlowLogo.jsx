import React from 'react';

/**
 * MediFlow Logo Component
 * Displays the official MediFlow medical cross logo with heart and arrow design
 *
 * Props:
 * - size: 'sm' (24px), 'md' (32px), 'lg' (48px), 'xl' (64px), '2xl' (80px), 'full' - default 'md'
 * - variant: 'icon' (image only), 'text' (image + text), 'text-only' - default 'icon'
 * - showBadge: Display role badge below logo - default false
 * - badge: Role badge text ('Admin', 'Doctor', 'Patient') - optional
 * - shape: 'circle' (rounded-full), 'rounded' (rounded-lg), 'square' (no radius) - default 'circle'
 * - withBg: Add background container - default true
 * - withBorder: Add border around logo - default false
 * - interactive: Add hover effects - default true
 */
export default function MediFlowLogo({
    size = 'md',
    variant = 'icon',
    showBadge = false,
    badge = null,
    shape = 'circle',
    withBg = true,
    withBorder = false,
    interactive = true,
    className = ''
}) {
    const sizeMap = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
        '2xl': 'w-20 h-20',
        full: 'w-full max-w-xs'
    };

    const shapeMap = {
        circle: 'rounded-full',
        rounded: 'rounded-xl',
        square: 'rounded-none'
    };

    const textSizeMap = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
        xl: 'text-2xl',
        '2xl': 'text-3xl',
        full: 'text-4xl'
    };

    const badgeSizeMap = {
        sm: 'text-[10px] px-1.5 py-0.5',
        md: 'text-xs px-2 py-1',
        lg: 'text-sm px-3 py-1.5',
        xl: 'text-base px-4 py-2',
        '2xl': 'text-lg px-5 py-2.5',
        full: 'text-xl px-6 py-3'
    };

    const containerClasses = `
        flex flex-col items-center gap-2 ${className}
    `.trim();

    const logoClasses = `
        ${sizeMap[size]}
        ${shapeMap[shape]}
        object-cover
        object-center
        transition-all duration-300
        ${interactive ? 'hover:scale-110 hover:shadow-lg cursor-pointer' : ''}
        ${withBorder ? 'border-2 border-blue-200 dark:border-blue-800' : ''}
        shadow-md dark:shadow-xl
    `.replace(/\s+/g, ' ').trim();

    return (
        <div className={containerClasses}>
            {/* Logo Image */}
            {(variant === 'icon' || variant === 'text') && (
                <div className={`flex items-center justify-center ${withBg ? 'p-2 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-full shadow-lg ring-2 ring-blue-200 dark:ring-blue-900/50' : 'rounded-full'} transition-all duration-300`}>
                    <img
                        src="/images/mediflow-logo.jpg"
                        alt="MediFlow"
                        className={logoClasses}
                    />
                </div>
            )}

            {/* Text */}
            {(variant === 'text' || variant === 'text-only') && (
                <div className="text-center">
                    <p className={`font-black text-slate-900 dark:text-white leading-none tracking-tight ${textSizeMap[size]}`}>
                        MediFlow
                    </p>
                    {variant === 'text' && (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Patient Monitoring
                        </p>
                    )}
                </div>
            )}

            {/* Role Badge */}
            {showBadge && badge && (
                <span className={`${badgeSizeMap[size]} bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all`}>
                    {badge}
                </span>
            )}
        </div>
    );
}
