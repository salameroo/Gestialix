import React from 'react';
import { Bell } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';

const notifications = [
    { id: 1, message: 'Nueva clase agregada', time: '5 min ago' },
    { id: 2, message: 'Recordatorio: Reunión de profesores', time: '1 hora ago' },
    { id: 3, message: 'Actualización del sistema', time: '2 horas ago' },
];

export const NotificationsPopover = () => (
    <Popover.Root>
        <Popover.Trigger asChild>
            <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <Bell className="h-6 w-6" />
            </button>
        </Popover.Trigger>
        <Popover.Portal>
            <Popover.Content className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-72">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Notificaciones</h3>
                <ul className="space-y-2">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="text-sm text-gray-600 dark:text-gray-300">
                            <p>{notification.message}</p>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                        </li>
                    ))}
                </ul>
                <Popover.Arrow className="fill-white dark:fill-gray-800" />
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

