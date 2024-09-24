'use client'

import { useState } from 'react'
import { Input } from 'apps/easyAccess/libs/ui/input'
import { Button } from 'apps/easyAccess/libs/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'apps/easyAccess/libs/ui/card'
import { Label } from 'apps/easyAccess/libs/ui/label'
import { Textarea } from 'apps/easyAccess/libs/ui/textarea'
import ThemeSwitch from '../../_components/ThemeSwitch'
import LangSwitcher from '../../_components/LangSwitcher'

export default function SettingsPage() {
    const [openAIKey, setOpenAIKey] = useState('')
    const [scenarioSettings, setScenarioSettings] = useState('')

    const handleOpenAIKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenAIKey(e.target.value)
    }

    const handleScenarioSettingsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setScenarioSettings(e.target.value)
    }

    const handleSave = () => {
        // 这里添加保存设置的逻辑
        console.log('Saving settings:', { openAIKey, scenarioSettings })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>应用设置</CardTitle>
                    <CardDescription>管理您的应用程序首选项</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="theme">主题</Label>
                        <ThemeSwitch />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="language">语言</Label>
                        <LangSwitcher />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>OpenAI 配置</CardTitle>
                    <CardDescription>设置您的 OpenAI API 密钥</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="openai-key">OpenAI API 密钥</Label>
                        <Input
                            id="openai-key"
                            type="password"
                            placeholder="输入您的 OpenAI API 密钥"
                            value={openAIKey}
                            onChange={handleOpenAIKeyChange}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>场景设置</CardTitle>
                    <CardDescription>配置您的应用场景</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="scenario-settings">场景配置</Label>
                        <Textarea
                            id="scenario-settings"
                            placeholder="输入您的场景设置"
                            value={scenarioSettings}
                            onChange={handleScenarioSettingsChange}
                        />
                    </div>
                </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full">保存设置</Button>
        </div>
    )
}