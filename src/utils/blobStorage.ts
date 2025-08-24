import { BlobServiceClient } from '@azure/storage-blob';

// Storage account configuration
const accountName = "sacardimages";
const containerName = "card-images";

// Create URL with SAS token
const sasUrl = `https://${accountName}.blob.core.windows.net?sv=2024-11-04&ss=bfqt&srt=co&sp=rwlacutfx&se=2027-04-21T13:44:36Z&st=2025-08-24T05:29:36Z&spr=https,http&sig=32Sf4Yf0lxiBYuzGy6Cdkr4nrc2EcFtBgM5Oy1rERrU%3D`;

// Create the BlobServiceClient
const blobServiceClient = new BlobServiceClient(sasUrl);

export async function uploadImageToBlob(file: File): Promise<string> {
    try {
        // Generate a unique blob name
        const blobName = `${Date.now()}-${file.name}`;

        // Get container client
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Get blob client
        const blobClient = containerClient.getBlockBlobClient(blobName);

        console.log('Uploading to:', blobClient.url);

        // Upload file
        await blobClient.uploadData(await file.arrayBuffer(), {
            blobHTTPHeaders: { blobContentType: file.type }
        });

        console.log('Upload successful');

        // Generate SAS URL for read access
        const expiresOn = new Date();
        expiresOn.setFullYear(expiresOn.getFullYear() + 1); // 1 year from now

        // Just return the blob URL since we're using account SAS
        return blobClient.url;

        return sasUrl;
    } catch (error) {
        console.error('Error uploading to blob storage:', error);
        throw new Error('Failed to upload image');
    }
}
