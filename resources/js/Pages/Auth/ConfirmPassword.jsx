import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/user/confirm-password');
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Confirma tu Contraseña</h1>
            <p className="mb-4">Por favor, confirma tu contraseña antes de continuar.</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Confirmar
                </button>
            </form>
        </div>
    );
}
