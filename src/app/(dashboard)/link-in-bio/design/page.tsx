import LayoutSettings from "./_layout"
import { DesignSettings } from "./_types";

const data: DesignSettings = {
    layout: {
        type: "classic", // Options: "classic", "portrait", "banner"
        profilePicture: {
            url: "https://example.com/profile.jpg",
            shape: "rounded", // Options: "rounded", "circular"
            size: 130, // Profile picture size in pixels
            outline: true, // Boolean to show/hide outline
        },
        header: {
            type: "name", // Options: "name", "logo",
            logo: {
                // Will use this if type is logo or to store the uploaded logo
                url: "https://example.com/logo.png",
                size: "L", // Options: "S", "M", "L"
            },
            displayName: "macrambo",
            location: "Your Location",
            bio: "Your bio here",
            textSize: "L", // Options: "S", "M", "L"
        },
        socialIcons: {
            iconSize: "L", // Options: "S", "M", "L"
            openInNewTab: true, // Boolean for opening links in a new tab
            links: [
                // Can be added more on click of add social button
                {
                    platform: "email",
                    value: "user@example.com",
                    order: 1,
                },
                {
                    platform: "tiktok",
                    value: "@",
                    order: 2,
                },
                {
                    platform: "instagram",
                    value: "macrambo",
                    order: 3,
                },
                {
                    platform: "twitter",
                    value: "@",
                    order: 4,
                },
                {
                    platform: "youtube",
                    value: "@",
                    order: 5,
                },
                {
                    platform: "facebook",
                    value: "@",
                    order: 6,
                },
            ],
        },
        headerFormat: {
            format: "full", // Options: "full", "compact"
        },
    },
    appearance: {
        colorPalette: "brandKit", // Options: "brandKit", "sunnyPastel", "earthyElegance", "softBlush"
        backgroundType: "gradient", // Options: "solid", "gradient", "image", "video"
        backgroundOptions: {
            solid: {
                color: "#FFFFFF", // Solid color
            },
            gradient: {
                type: "linear", // Options: "linear", "radial", "diagonal"
                colors: ["#000000", "#FFFFFF"], // Gradient colors
            },
            image: {
                url: "https://example.com/image.jpg", // Uploaded or selected image URL
            },
            video: {
                url: "https://example.com/video.mp4", // Uploaded or selected video URL
            },
        },
        header: {
            backgroundColor: "#000000",
            textColor: "#FFFFFF",
        },
        linkBlock: {
            backgroundColor: "#000000",
            textColor: "#FFFFFF",
            buttonBackgroundColor: "#000000",
            buttonTextColor: "#FFFFFF",
        },
        blockStyle: {
            shape: "round", // Options: "square", "round", "fullWidth", "custom"
            shadow: false, // Boolean for shadow
            outline: false, // Boolean for outline
            transparency: 0, // Transparency percentage
        },
    },
    font: {
        selectedFont: "Poppins", // Options: Various font names as shown in the UI
        fontLibrary: "https://example.com/fonts",
    },
    pagePopup: {
        // IGNORE THIS FOR NOW : WILL ADD LATER
        type: "none", // Options: "promoteProduct", "collectEmails", "none"
        popupData: {
            title: "Popup Title",
            description: "Popup description",
            cta: "CTA Text",
        },
    },
    pageSettings: {
        showShareButton: true,
        showSubscribeButton: true, // Boolean for showing/hiding subscribe button (Need to ignore for now)
        hideFooter: false, // Boolean for hiding branding footer (Pro feature)
    },
};

const BioDesignPage = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="">
                <LayoutSettings layout={data.layout} />
            </div>
            <div className="hidden sm:block"></div>
        </div>
    )
}

export default BioDesignPage;