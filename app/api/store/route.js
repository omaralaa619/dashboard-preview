import connectDB from "@/lib/connectDB";
import Store from "@/models/storeModel";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const GET = async () => {
  connectDB();

  try {
    const storeData = await Store.find({});

    return NextResponse.json(storeData[0]);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

export const POST = async (req) => {
  connectDB();

  const body = await req.json();

  const storeData = await Store.findOne({});

  try {
    switch (body.type) {
      case "category": {
        const slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        storeData.categories.push({
          title: body.title,
          imageUrl: body.imageUrl,
          slug,
        });

        break;
      }

      case "hero": {
        storeData.hero.push({
          header: body.header,
          subheader: body.subheader,
          imageUrl: body.imageUrl,
          mediaType: body.mediaType,
        });
        break;
      }

      case "banner": {
        storeData.banner.content.push(body.content);
        break;
      }

      case "timer": {
        storeData.timer.header = body.header;
        storeData.timer.timeLeft = body.timeLeft;
        break;
      }

      case "imageGallery": {
        storeData.imageGallery[body.index] = body.imageUrl;
        break;
      }

      case "comment": {
        storeData.comments.push(body.content);
        break;
      }

      case "imageAnimation": {
        storeData.imageAnimation = body.content;
        break;
      }

      case "imageSection": {
        storeData.imageSection = body.content;
        break;
      }

      default:
        return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    // ✅ Save once
    const updatedStore = await storeData.save();

    // ✅ Revalidate once
    revalidateTag("home");

    // ✅ Respond once
    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const storeData = await Store.findOne({});

    if (!storeData) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    switch (body.type) {
      case "category": {
        const slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const index = storeData.categories.findIndex(
          (item) => item._id.toString() === body.id,
        );

        if (index !== -1) {
          storeData.categories[index] = {
            title: body.title,
            imageUrl: body.imageUrl,
            slug,
            date: body.date,
          };
        }

        break;
      }

      case "hero": {
        const index = storeData.hero.findIndex(
          (item) => item._id.toString() === body.id,
        );

        if (index !== -1) {
          storeData.hero[index] = {
            header: body.header,
            subheader: body.subheader,
            imageUrl: body.imageUrl,
            mediaType: body.mediaType,
          };
        }

        break;
      }

      case "banner": {
        const index = storeData.banner.content.findIndex(
          (item) => item === body.default,
        );

        if (index !== -1) {
          storeData.banner.content[index] = body.content;
        }

        break;
      }

      case "banner-show":
        storeData.banner.show = body.value;
        break;

      case "comment": {
        const index = storeData.comments.findIndex(
          (item) => item === body.default,
        );

        if (index !== -1) {
          storeData.comments[index] = body.content;
        }

        break;
      }

      case "imageAnimation":
        storeData.imageAnimation = body.content;
        break;

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const updatedStore = await storeData.save();

    // 🔥 Revalidate homepage only once
    revalidateTag("home");

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const storeData = await Store.findOne({});

    if (!storeData) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const utapi = new UTApi();

    switch (body.type) {
      case "category":
        storeData.categories = storeData.categories.filter(
          (category) => category.title !== body.title,
        );

        if (body.defaultImage) {
          const fileId = body.defaultImage.split("/")[4];
          await utapi.deleteFiles(fileId);
        }

        break;

      case "hero":
        storeData.hero = storeData.hero.filter(
          (item) => item.header !== body.header,
        );

        if (body.defaultImage) {
          const fileId = body.defaultImage.split("/")[4];
          await utapi.deleteFiles(fileId);
        }

        break;

      case "banner":
        storeData.banner.content = storeData.banner.content.filter(
          (item) => item !== body.content,
        );
        break;

      case "comment":
        storeData.comments = storeData.comments.filter(
          (item) => item !== body.content,
        );
        break;

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const updatedStore = await storeData.save();

    // 🔥 Only revalidate once
    revalidateTag("home");

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
