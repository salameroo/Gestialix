import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import Spinner from '../ui/Spinner';


export function Charts() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/stats/asistencias'); // Llama al endpoint que creamos en el backend
                if (!response.ok) throw new Error('Error fetching attendance data');
                const data = await response.json();

                // Transformar los datos para Recharts
                const formattedData = data.map((item) => ({
                    day: item.fecha,
                    presentes: item.presentes,
                    ausentes: item.ausentes,
                    desconocidos: item.desconocidos,
                }));

                setChartData(formattedData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Asistencia Semanal</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="presentes" fill="#34d399" name="Presentes" />
                        <Bar dataKey="ausentes" fill="#f87171" name="Ausentes" />
                        <Bar dataKey="desconocidos" fill="#d1d5db" name="Sin marcar" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}





export function StudentRegistrationsChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/stats/altasEstudiantes');
                if (!response.ok) throw new Error('Error fetching registration data');
                const data = await response.json();

                // Transformar datos para Recharts
                const formattedData = data.map((item) => ({
                    date: item.date,
                    total: item.total,
                }));

                setChartData(formattedData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Registros de Estudiantes</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Estudiantes"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
