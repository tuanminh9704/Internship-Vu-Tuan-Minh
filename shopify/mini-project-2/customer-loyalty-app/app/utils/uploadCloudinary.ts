import { cloudinary } from "./cloudinary";

export async function uploadFileToCloudinary(file: File, folder = "shopify-reviews"): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return await new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err || !result) return reject(err);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}

export async function uploadManyToCloudinary(files: File[], folder = "shopify-reviews"): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const url = await uploadFileToCloudinary(file, folder);
    urls.push(url);
  }

  return urls;
}
