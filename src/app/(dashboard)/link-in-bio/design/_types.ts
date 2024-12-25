// Utility Types
type Size = 'S' | 'M' | 'L';
type Shape = 'rounded' | 'circular' | 'square' | 'round' | 'fullWidth' | 'custom';
type SocialPlatform = 'email' | 'tiktok' | 'instagram' | 'twitter' | 'youtube' | 'facebook' | 'linkedin' | 'github';

export type ProfilePicture = {
    url: string;
    shape: 'rounded' | 'circular';
    size: number;
    outline: boolean;
}

export type HeaderText = {
    type: 'name' | 'logo';
    logo: {
        url: string;
        size: Size;
    };
    displayName: string;
    location: string;
    bio: string;
    textSize: Size;
}

export type SocialIcons = {
    iconSize: Size;
    openInNewTab: boolean;
    links: {
        platform: SocialPlatform;
        value: string;
        order: number;
    }[];
}

export type Layout = {
    type: 'classic' | 'portrait' | 'banner';
    profilePicture: ProfilePicture;
    header: HeaderText;
    socialIcons: SocialIcons;
    headerFormat: {
        format: 'full' | 'compact';
    };
}

export type Appearance = {
    colorPalette: 'brandKit' | 'sunnyPastel' | 'earthyElegance' | 'softBlush';
    backgroundType: 'solid' | 'gradient' | 'image' | 'video';
    backgroundOptions: {
        solid?: { color: string };
        gradient?: { type: 'linear' | 'radial' | 'diagonal', colors: string[] };
        image?: { url: string };
        video?: { url: string };
    };
    header: {
        backgroundColor: string;
        textColor: string;
    };
    linkBlock: {
        backgroundColor: string;
        textColor: string;
        buttonBackgroundColor: string;
        buttonTextColor: string;
    };
    blockStyle: {
        shape: Shape;
        shadow: boolean;
        outline: boolean;
        transparency: number;
    };
}

export type Font = {
    selectedFont: string;
    fontLibrary: string;
}

export type PagePopup = {
    type: 'promoteProduct' | 'collectEmails' | 'none';
    popupData?: {
        title: string;
        description: string;
        cta: string;
    };
}

export type PageSettings = {
    showShareButton: boolean;
    showSubscribeButton: boolean;
    hideFooter: boolean;
}

export type DesignSettings = {
    layout: Layout;
    appearance: Appearance;
    font: Font;
    pagePopup: PagePopup;
    pageSettings: PageSettings;
}