import AdminAddVehicleForm from "@/components/admin/admin-vehicle-form";
import { getVehicle } from "@/data/actions/vehicle";

const EditVehiclePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  return <AdminAddVehicleForm type="Update" vehicle={vehicle.data} />;
};

export default EditVehiclePage;
