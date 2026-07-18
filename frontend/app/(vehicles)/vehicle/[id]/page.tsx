import { Badge } from "@/components/ui/badge";
import VehicleImageGallery from "@/components/vehicles/vehicle-image-gallery";
import VehicleSpec from "@/components/vehicles/vehicle-spec";
import { getVehicle } from "@/data/actions/vehicle";
import { generateVehicleMetadata } from "@/lib/seo/vehicle";
import {
  Calendar,
  CircleCheck,
  Cog,
  DoorOpen,
  Fuel,
  Gauge,
  Palette,
  Users,
} from "lucide-react";
import BookingForm from "./booking-form";
import VehicleDetailStepper from "./vehicle-detail-stepper";
import { getCountries } from "@/data/actions/country";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  return generateVehicleMetadata(props);
}

const VehicleDetail = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const { data } = await getVehicle(id);

  const countryData = await getCountries();

  console.log(countryData);

  console.log(data);

  return (
    <>
      <VehicleDetailStepper vehicle={data} country={countryData} />
    </>
  );
};

export default VehicleDetail;
