"use client";

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronUp, Plus } from "lucide-react"
import React, { useState } from 'react'
import { HeaderText, Layout, ProfilePicture, SocialIcons } from './_types';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LayoutSettings({ layout }: { layout: Layout }) {
    return (
        <Card className="p-4 rounded-md">
            <CardHeader className="flex-row p-0 items-center justify-between">
                <span className="text-lg font-bold">Layout</span>
                <ChevronUp />
            </CardHeader>
            <CardContent className="p-0">
                <div>Layout structure selector here</div>
                <Separator className="my-8" />
                <ProfilePictureSettings profilePicture={layout.profilePicture} />
                <Separator className="my-8" />
                <HeaderTextSettings headerText={layout.header} />
                <Separator className="my-8" />
                <SocialIconsSettings socialIcons={layout.socialIcons} />
                <Separator className="my-8" />
                <HeaderFormat format={layout.headerFormat.format} />
            </CardContent>
        </Card>
    )
}

function ProfilePictureSettings({ profilePicture }: { profilePicture: ProfilePicture }) {
    const [profilePictureSize, setProfilePictureSize] = useState(profilePicture.size);
    const [profilePictureShape, setProfilePictureShape] = useState(profilePicture.shape);

    return (
        <div className="grid gap-4">
            <div>
                <span className="font-semibold">Profile picture</span>
                <p className="text-muted-foreground text-sm">Image should be at least 600x600px and in JPG, PNG or GIF format.</p>
                <p>Image uploader here</p>
            </div>
            <div>
                <span className="font-semibold">Profile picture shape</span>
                <div className="flex gap-4 mt-2">
                    <div>
                        <div className={cn("w-28 h-28 border rounded-md relative cursor-pointer", { "border-2 border-secondary-foreground": profilePictureShape === "rounded" })} onClick={() => setProfilePictureShape("rounded")}>
                            <div className={cn("absolute bg-border inset-8 rounded-md", profilePictureShape === "rounded" ? "bg-secondary-foreground" : "bg-border")}></div>
                        </div>
                        <span className={cn("uppercase font-bold text-sm text-center block mt-1", { "text-muted-foreground/60": profilePictureShape !== "rounded" })}>Rounded</span>
                    </div>
                    <div>
                        <div className={cn("w-28 h-28 border rounded-md relative cursor-pointer", { "border-2 border-secondary-foreground": profilePictureShape === "circular" })} onClick={() => setProfilePictureShape("circular")}>
                            <div className={cn("absolute inset-8 rounded-full", profilePictureShape === "circular" ? "bg-secondary-foreground" : "bg-border")}></div>
                        </div>
                        <span className={cn("uppercase font-bold text-sm text-center block mt-1", { "text-muted-foreground/60": profilePictureShape !== "circular" })}>Circular</span>
                    </div>
                </div>
            </div>
            <div>
                <span>Profile picture size</span>
                <div className="flex gap-4">
                    <Slider className="grow-[1]" value={[profilePictureSize]} onValueChange={(value) => setProfilePictureSize(value[0])} min={50} max={300} />
                    <Input className="w-max" type="number" value={profilePictureSize} onChange={(e) => setProfilePictureSize(Number(e.target.value))} min={50} max={300} />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <Switch defaultChecked={profilePicture.outline} />
                <span className="text-sm">Profile picture outline</span>
            </div>
        </div>
    )
}

function HeaderTextSettings({ headerText }: { headerText: HeaderText }) {
    const [textType, setTextType] = useState(headerText.type);
    const [textSize, setTextSize] = useState(headerText.textSize);

    return (
        <div className="grid gap-4">
            <div>
                <span className="font-semibold">Header text</span>
                <div className="flex gap-4 mt-2">
                    <div>
                        <div className={cn("w-28 h-28 border rounded-md relative cursor-pointer", { "border-2 border-secondary-foreground": textType === "name" })} onClick={() => setTextType("name")}>
                            <div className={cn("absolute bg-border inset-8 rounded-md", textType === "name" ? "bg-secondary-foreground" : "bg-border")}></div>
                        </div>
                        <span className={cn("uppercase font-bold text-sm text-center block mt-1", { "text-muted-foreground/60": textType !== "name" })}>Name</span>
                    </div>
                    <div>
                        <div className={cn("w-28 h-28 border rounded-md relative cursor-pointer", { "border-2 border-secondary-foreground": textType === "logo" })} onClick={() => setTextType("logo")}>
                            <div className={cn("absolute inset-8 rounded-full", textType === "logo" ? "bg-secondary-foreground" : "bg-border")}></div>
                        </div>
                        <span className={cn("uppercase font-bold text-sm text-center block mt-1", { "text-muted-foreground/60": textType !== "logo" })}>Logo</span>
                    </div>
                </div>
            </div>
            <div className="grid gap-2 mt-2">
                <div>
                    <Label>Display name (leave blank to reset)</Label>
                    <Input type="text" defaultValue={headerText.displayName} placeholder='Enter your display name' className='block w-full' />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input type="text" defaultValue={headerText.location} placeholder='Enter your location' className='block w-full' />
                </div>
                <div>
                    <Label>Bio</Label>
                    <Input type="text" defaultValue={headerText.bio} placeholder='Enter your bio' className='block w-full' />
                </div>
            </div>
            {
                textType === "name" ? (
                    <div>
                        <span className="font-semibold">Header text size</span>
                        <div className="flex gap-2 mt-2">
                            <div>
                                <div className={cn("w-12 h-12 border rounded-md grid place-items-center cursor-pointer", { "border-[3px] border-secondary-foreground": textSize === "S" })} onClick={() => setTextSize("S")}>
                                    <span className={cn("font-black", { "text-muted-foreground/60": textSize !== "S" })}>S</span>
                                </div>
                            </div>
                            <div>
                                <div className={cn("w-12 h-12 border rounded-md grid place-items-center cursor-pointer", { "border-[3px] border-secondary-foreground": textSize === "M" })} onClick={() => setTextSize("M")}>
                                    <span className={cn("font-black", { "text-muted-foreground/60": textSize !== "M" })}>M</span>
                                </div>
                            </div>
                            <div>
                                <div className={cn("w-12 h-12 border rounded-md grid place-items-center cursor-pointer", { "border-[3px] border-secondary-foreground": textSize === "L" })} onClick={() => setTextSize("L")}>
                                    <span className={cn("font-black", { "text-muted-foreground/60": textSize !== "L" })}>L</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

function SocialIconsSettings({ socialIcons }: { socialIcons: SocialIcons }) {
    const [iconSize, setIconSize] = useState(socialIcons.iconSize);

    return (
        <div>
            <div>
                <span className="font-semibold">Social icons</span>
                <p className="text-muted-foreground text-sm">Your social icons will appear below your header text.</p>
            </div>
            <div className='grid gap-4'>
                <div>
                    {socialIcons.links.map((link) => (
                        <div key={link.platform} className="grid gap-2 mt-2">
                            <div>
                                <Label>{link.platform}</Label>
                                <Input type="text" defaultValue={link.value} placeholder='Enter value' className='block w-full' />
                            </div>
                        </div>
                    ))}
                    <Button className="w-full mt-4" onClick={() => { }}><Plus /> Add social</Button>
                </div>
                <div>
                    <span className="font-bold text-sm">Social icon size</span>
                    <div className="flex gap-2 mt-2">
                        <div>
                            <div className={cn("w-12 h-12 border rounded-md grid place-items-center cursor-pointer", { "border-[3px] border-secondary-foreground": iconSize === "S" })} onClick={() => setIconSize("S")}>
                                <span className={cn("font-black", { "text-muted-foreground/60": iconSize !== "S" })}>S</span>
                            </div>
                        </div>
                        <div>
                            <div className={cn("w-12 h-12 border rounded-md grid place-items-center cursor-pointer", { "border-[3px] border-secondary-foreground": iconSize === "M" })} onClick={() => setIconSize("M")}>
                                <span className={cn("font-black", { "text-muted-foreground/60": iconSize !== "M" })}>M</span>
                            </div>
                        </div>
                        <div>
                            <div className={cn("w-12 h-12 border rounded-md grid place-items-center cursor-pointer", { "border-[3px] border-secondary-foreground": iconSize === "L" })} onClick={() => setIconSize("L")}>
                                <span className={cn("font-black", { "text-muted-foreground/60": iconSize !== "L" })}>L</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <Switch defaultChecked={socialIcons.openInNewTab} />
                    <span className="text-sm">Open social links in new tab</span>
                </div>
            </div>
        </div>
    )
}

function HeaderFormat({ format }: { format: "full" | "compact" }) {
    const [headerFormat, setHeaderFormat] = useState(format);

    return (
        <div>
            <span className="font-semibold">Header format</span>
            <div className="flex gap-4 mt-2">
                <div>
                    <div className={cn("w-28 h-28 border rounded-md grid place-items-center cursor-pointer", { "border-2 border-secondary-foreground": headerFormat === "full" })} onClick={() => setHeaderFormat("full")}>
                        <div className='grid gap-1 items-center'>
                            <div className={cn("w-10 mx-auto h-10 rounded-full", headerFormat === "full" ? "bg-secondary-foreground" : "bg-border")} />
                            <div className={cn("w-12 mx-auto h-3 rounded-full", headerFormat === "full" ? "bg-secondary-foreground" : "bg-border")} />
                            <div className='flex mx-auto gap-1'>
                                {
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <div className={cn("w-3 h-3 rounded-sm", headerFormat === "full" ? "bg-secondary-foreground" : "bg-border")} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <span className={cn("uppercase font-bold text-sm text-center block mt-1", { "text-muted-foreground/60": headerFormat !== "full" })}>Full</span>
                </div>
                <div>
                    <div className={cn("w-28 h-28 border rounded-md grid place-items-center cursor-pointer", { "border-2 border-secondary-foreground": headerFormat === "compact" })} onClick={() => setHeaderFormat("compact")}>
                        <div className='flex gap-1 items-center'>
                            <div className={cn("w-6 h-6 rounded-full", headerFormat === "compact" ? "bg-secondary-foreground" : "bg-border")} />
                            <div className='grid gap-1'>
                                <div className={cn("w-12 h-2 rounded-full", headerFormat === "compact" ? "bg-secondary-foreground" : "bg-border")} />
                                <div className='flex gap-1'>
                                    {
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <div className={cn("w-2 h-2 rounded-[2px]", headerFormat === "compact" ? "bg-secondary-foreground" : "bg-border")} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className={cn("uppercase font-bold text-sm text-center block mt-1", { "text-muted-foreground/60": headerFormat !== "compact" })}>Compact</span>
                </div>
            </div>
        </div>
    )
}