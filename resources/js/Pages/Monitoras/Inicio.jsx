import MonitorasList from "@/Components/Monitoras/MonitoraList"
import AppLayout from "@/Layouts/AppLayout"

export default function Monitoras() {
    return (
        <AppLayout>
            <div className="monitoras">
                <h2>Monitoras</h2>
                <MonitorasList />
            </div>
        </AppLayout>
    )
}