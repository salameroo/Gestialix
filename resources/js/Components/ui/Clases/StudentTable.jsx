// components/StudentTable.js
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const StudentTable = ({ students, onStudentDelete, isDeleteModalOpen }) => {
    return (
        <div className="mt-2 bg-gray-50 rounded-lg p-4">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-600">
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Asignado al Comedor</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id} className="border-t border-gray-200">
                            <td className="py-2">{student.nombre}</td>
                            <td className="py-2">
                                <button
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${student.assigned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    {student.assigned ? 'Asignado' : 'No asignado'}
                                </button>
                            </td>
                            <td className="py-2">
                                <div className="flex space-x-2">
                                    <button className="p-1 hover:bg-gray-200 rounded-full">
                                        <Edit className="w-4 h-4 text-blue-500" />
                                    </button>
                                    <button onClick={() => onStudentDelete(student.id)} className="p-1 hover:bg-gray-200 rounded-full">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                    <ConfirmModal
                                        isOpen={isDeleteModalOpen}
                                        onConfirm={() => onDelete(classData.id)}
                                        onCancel={() => setIsDeleteModalOpen(false)}
                                        message="¿Estás seguro de que quieres eliminar esta clase?"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
