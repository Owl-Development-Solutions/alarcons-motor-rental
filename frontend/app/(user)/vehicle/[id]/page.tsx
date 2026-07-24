import { getVehicle } from "@/data/actions/vehicle";
import { generateVehicleMetadata } from "@/lib/seo/vehicle";
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

  return (
    <>
      <VehicleDetailStepper vehicle={data} country={countryData} />
    </>
  );
};

export default VehicleDetail;
