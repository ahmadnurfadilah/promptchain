import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fontData = await fetch(new URL("../../../public/fonts/JetBrainsMono-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer());

    let width;
    let height;
    const size = searchParams.get("size");
    if (size === "square") {
      width = 1080;
      height = 1080;
    } else if (size === "landscape") {
      width = 1920;
      height = 1080;
    } else if (size === "portrait") {
      width = 1080;
      height = 1920;
    } else {
      width = 1200;
      height = 630;
    }

    return new ImageResponse(
      (
        <div
          style={{
            color: "#222",
            background: "#DEECA3",
            color: "#1b4a58",
            width: "100%",
            height: "100%",
            textAlign: "center",
            fontFamily: '"JetBrainsMono"',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: 128,
              lineHeight: 1.2,
            }}
          >
            #{searchParams.get("id")}
          </h4>
          <div
            style={{
              fontSize: 32,
              position: "absolute",
              background: "#1b4a58",
              color: "white",
              padding: `5px 10px`,
              borderRadius: "8px",
              left: "5%",
              top: "5%",
              display: "flex",
            }}
          >
            <p
              style={{
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              {searchParams.get("category")}
            </p>
          </div>
        </div>
      ),
      {
        width: width,
        height: height,
        fonts: [
          {
            name: "JetBrainsMono",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
