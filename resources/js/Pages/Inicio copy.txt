'use client'

import { useState } from 'react'
import { Button } from "@/components/vercel/ui/button"
import { Input } from "@/components/vercel/ui/input"
import { Label } from "@/components/vercel/ui/label"
import { Switch } from "@/components/vercel/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/vercel/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/vercel/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/vercel/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/vercel/ui/select"
import { Bell, Lock, User, Globe, Palette } from 'lucide-react'

export default function UserProfileSettingsView() {
    const [name, setName] = useState('Carlos García')
    const [email, setEmail] = useState('carlos@gestialix.com')
    const [language, setLanguage] = useState('es')
    const [theme, setTheme] = useState('light')
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false
    })

    const handleSave = () => {
        // Implementar lógica para guardar cambios
        console.log('Guardando cambios...')
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Ajustes de Perfil</h1>
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Avatar" />
                                <AvatarFallback>CG</AvatarFallback>
                            </Avatar>
                            <Button>Cambiar foto</Button>
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">{name}</h2>
                                <p className="text-sm text-muted-foreground">{email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="personal"><User className="w-4 h-4 mr-2" />Personal</TabsTrigger>
                        <TabsTrigger value="security"><Lock className="w-4 h-4 mr-2" />Seguridad</TabsTrigger>
                        <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />Notificaciones</TabsTrigger>
                        <TabsTrigger value="preferences"><Palette className="w-4 h-4 mr-2" />Preferencias</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Personal</CardTitle>
                                <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre completo</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Seguridad</CardTitle>
                                <CardDescription>Gestiona tu contraseña y la seguridad de tu cuenta.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Contraseña actual</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">Nueva contraseña</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                                <Button>Cambiar contraseña</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notificaciones</CardTitle>
                                <CardDescription>Configura cómo quieres recibir las notificaciones.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-notifications">Notificaciones por email</Label>
                                        <p className="text-sm text-muted-foreground">Recibe actualizaciones en tu correo.</p>
                                    </div>
                                    <Switch
                                        id="email-notifications"
                                        checked={notifications.email}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="push-notifications">Notificaciones push</Label>
                                        <p className="text-sm text-muted-foreground">Recibe notificaciones en tu dispositivo.</p>
                                    </div>
                                    <Switch
                                        id="push-notifications"
                                        checked={notifications.push}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="sms-notifications">Notificaciones SMS</Label>
                                        <p className="text-sm text-muted-foreground">Recibe alertas importantes por SMS.</p>
                                    </div>
                                    <Switch
                                        id="sms-notifications"
                                        checked={notifications.sms}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="preferences">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferencias</CardTitle>
                                <CardDescription>Personaliza tu experiencia en Gestialix.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Idioma</Label>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Selecciona un idioma" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="es">Español</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="theme">Tema</Label>
                                    <Select value={theme} onValueChange={setTheme}>
                                        <SelectTrigger id="theme">
                                            <SelectValue placeholder="Selecciona un tema" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Claro</SelectItem>
                                            <SelectItem value="dark">Oscuro</SelectItem>
                                            <SelectItem value="system">Sistema</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={handleSave}>Guardar cambios</Button>
            </div>
        </div>
    )
}