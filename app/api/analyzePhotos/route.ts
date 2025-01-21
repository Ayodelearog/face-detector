import { NextRequest, NextResponse } from "next/server";
import vision from "@google-cloud/vision";

const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

if (!credentialsJson) {
  throw new Error(
    "GOOGLE_APPLICATION_CREDENTIALS_JSON is not defined in the environment variables."
  );
}

const credentials = JSON.parse(credentialsJson);
const client = new vision.ImageAnnotatorClient({ credentials });

/**
 * API route to analyze profile photos.
 * @param {NextRequest} req - HTTP request object
 * @returns {NextResponse} - HTTP response object
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON body
    const { users } = body;

    console.log(body, "111122222")

    if (!users || !Array.isArray(users)) {
      return NextResponse.json(
        { success: false, message: 'Invalid input. "users" must be an array.' },
        { status: 400 }
      );
    }

    const results = [];

    for (const user of users) {
      const { userid, profilephoto } = user;

      try {
        // Analyze the photo for faces
        const [faceResponse] = await client.faceDetection(profilephoto);
        const faces = faceResponse.faceAnnotations;

        if (!faces || faces.length === 0) {
          results.push({
            userid,
            results: { error: "No faces detected in the photo." },
          });
          continue;
        }

        // Analyze the photo for SafeSearch
        const [safeSearchResponse] = await client.safeSearchDetection(
          profilephoto
        );
        const safeSearch = safeSearchResponse.safeSearchAnnotation;

        results.push({
          userid,
          results: {
            faces,
            safeSearch,
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          results.push({
            userid,
            results: { error: `Error analyzing photo: ${error.message}` },
          });
        } else {
          results.push({
            userid,
            results: { error: "An unknown error occurred" },
          });
        }
      }
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Server error: ${error instanceof Error ? error.message : "An unknown error occurred"}`,
      },
      { status: 500 }
    );
  }
}
