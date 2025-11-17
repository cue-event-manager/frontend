const CLOUDFRONT_BASE_URL = "https://d1z2jagk4z4o7g.cloudfront.net/";
const DEFAULT_EVENT_IMAGE = "/common/no-image.png";

export function getEventImageUrl(imagePath?: string | null) {
    if (!imagePath) {
        return DEFAULT_EVENT_IMAGE;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `${CLOUDFRONT_BASE_URL}${imagePath}`;
}

export { CLOUDFRONT_BASE_URL, DEFAULT_EVENT_IMAGE };
