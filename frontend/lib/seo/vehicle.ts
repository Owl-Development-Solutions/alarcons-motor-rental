import { getVehicle } from "@/data/actions/vehicle";
import { Metadata } from "next";

export async function generateVehicleMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const { data } = await getVehicle(id);

  if (!data) {
    return {
      title: "Vehicle Not Found",
    };
  }

  const title = `${data.make} ${data.model} | Vehicle`;
  const description = `Rent the ${data.make} ${data.model} today.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: data.images[0],
        },
      ],
    },
    //social media for example fb, twitter, insta
  };
}
