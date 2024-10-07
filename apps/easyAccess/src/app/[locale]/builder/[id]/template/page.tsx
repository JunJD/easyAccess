import { Label } from "apps/easyAccess/libs/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "apps/easyAccess/libs/ui/select";
import { Slider } from "apps/easyAccess/libs/ui/slider";
import { TemplateSection } from "./feature/template";

const TemplateAndLayoutPage = () => (
    <div className="space-y-8 p-4">
        <section>
            <TemplateSection />
        </section>
        <section>
            <h2 className="text-2xl font-bold mb-4">Font Settings</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select>
                        <SelectTrigger id="font-family">
                            <SelectValue placeholder="Choose a font" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="arial">Arial</SelectItem>
                            <SelectItem value="helvetica">Helvetica</SelectItem>
                            <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                            <SelectItem value="calibri">Calibri</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="font-size">Font Size</Label>
                    <Slider
                        id="font-size"
                        min={8}
                        max={24}
                        step={1}
                        defaultValue={[12]}
                        className="w-full"
                    />
                </div>
            </div>
        </section>
        <section>
            <h2 className="text-2xl font-bold mb-4">Layout Settings</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="margin">Margin</Label>
                    <Slider
                        id="margin"
                        min={0}
                        max={50}
                        step={1}
                        defaultValue={[20]}
                        className="w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="line-spacing">Line Spacing</Label>
                    <Slider
                        id="line-spacing"
                        min={1}
                        max={2}
                        step={0.1}
                        defaultValue={[1.5]}
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    </div>
)

export default TemplateAndLayoutPage