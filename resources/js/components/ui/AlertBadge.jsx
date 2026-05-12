import React from 'react';

const severityConfig = {
    emergency: { cls: 'status-emergency', dot: true,  label: 'Emergency' },
    critical:  { cls: 'status-critical',  dot: false, label: 'Critical'  },
    warning:   { cls: 'status-warning',   dot: false, label: 'Warning'   },
    info:      { cls: 'status-info',      dot: false, label: 'Info'      },
    resolved:  { cls: 'status-resolved',  dot: false, label: 'Resolved'  },
};

export default function AlertBadge({ severity }) {
    const cfg = severityConfig[severity] ?? severityConfig.info;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${cfg.cls}`}>
            {cfg.dot && <span className="w-1.5 h-1.5 bg-current rounded-full badge-pulse flex-shrink-0" />}
            {cfg.label}
        </span>
    );
}
    critical:  'bg-red-100   dark:bg-red-900/40  text-red-700  dark:text-red-300',
    warning:   'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
    info:      'bg-blue-100  dark:bg-blue-900/40  text-blue-700  dark:text-blue-300',
};

export default function AlertBadge({ severity }) {
    const cls = severityMap[severity] ?? severityMap.info;
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${cls}`}>
            {severity === 'emergency' && <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 badge-pulse" />}
            {severity}
        </span>
    );
}
