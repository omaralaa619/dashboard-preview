import connectDB from "@/lib/connectDB";
import Store from "@/models/storeModel";
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
      case "category":
        const slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        storeData.categories.push({
          title: body.title,
          imageUrl: body.imageUrl,
          slug: slug,
        });
        // Save the updated store data
        await storeData.save();
        break;
      case "hero":
        storeData.hero.push({
          header: body.header,
          subheader: body.subheader,
          imageUrl: body.imageUrl,
        });
        // Save the updated store data
        await storeData.save();

        break;

      case "banner":
        storeData.banner.content.push(body.content);
        await storeData.save();
        break;

      case "timer":
        storeData.timer.header = body.header;
        storeData.timer.timeLeft = body.timeLeft;
        await storeData.save();

        break;
    }

    console.log("done");

    return NextResponse.json({ message: "done" });
  } catch (error) {
    console.log(error);

    console.log("done");
    return NextResponse.json({ error: error });
  }
};

export const PUT = async (req) => {
  connectDB();

  const body = await req.json();

  const storeData = await Store.findOne({});

  switch (body.type) {
    case "category":
      try {
        const categoryIndex = storeData.categories.findIndex(
          (item) => item._id.toString() === body.id
        );

        storeData.categories[categoryIndex] = {
          title: body.title,
          imageUrl: body.imageUrl,
        };
        await storeData.save();
        return NextResponse.json({ message: "done" });
      } catch (error) {
        console.log(error);

        console.log("done");
        return NextResponse.json({ error: error });
      }

      break;
    case "hero":
      try {
        const heroIndex = storeData.hero.findIndex(
          (item) => item._id.toString() === body.id
        );

        storeData.hero[heroIndex] = {
          header: body.header,
          subheader: body.subheader,
          imageUrl: body.imageUrl,
        };
        await storeData.save();
        return NextResponse.json({ message: "done" });
      } catch (error) {
        console.log(error);

        console.log("done");
        return NextResponse.json({ error: error });
      }

      break;

    case "banner":
      const bannerIndex = storeData.banner.content.findIndex(
        (item) => item == body.default
      );

      console.log(bannerIndex);

      storeData.banner.content[bannerIndex] = body.content;
      await storeData.save();
      return NextResponse.json({ message: "done" });

      break;
    case "banner-show":
      storeData.banner.show = body.value;
      await storeData.save();

      console.log(body.value);

      return NextResponse.json({ message: "done" });

      break;
  }
};

export const DELETE = async (req) => {
  const body = await req.json();

  switch (body.type) {
    case "category":
      try {
        connectDB();
        const utapi = new UTApi();

        const storeData = await Store.findOne({});

        storeData.categories = storeData.categories.filter(
          (category) => category.title !== body.title
        );

        await storeData.save();

        const id = body.defaultImage.split("/")[4];
        const res = await utapi.deleteFiles(id);

        return NextResponse.json({ message: "done" });
      } catch (error) {
        console.log(error);
        return NextResponse.json(error);
      }

    case "hero":
      try {
        connectDB();

        const utapi = new UTApi();

        const storeData = await Store.findOne({});

        storeData.hero = storeData.hero.filter(
          (item) => item.header !== body.header
        );

        await storeData.save();

        const id = body.defaultImage.split("/")[4];
        const res = await utapi.deleteFiles(id);

        return NextResponse.json({ message: "done" });
      } catch (error) {
        console.log(error);
        return NextResponse.json(error);
      }
    case "banner":
      try {
        connectDB();

        const storeData = await Store.findOne({});

        storeData.banner.content = storeData.banner.content.filter(
          (item) => item !== body.content
        );

        await storeData.save();

        return NextResponse.json({ message: "done" });
      } catch (error) {
        console.log(error);
        return NextResponse.json(error);
      }
  }

  return NextResponse.json({ message: "done" });
};
