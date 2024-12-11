import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { paragon } from "@useparagon/connect";
import Swal from "sweetalert2";

export const authenticateUser = async (integrationType: string) => {
  try {
    const response = await instance.post(
      `${API_URL}/users/api/v1/connectors/connect`,
      {}
    );
    const token = response.data.data.token;
    await paragon.authenticate(
      process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID || "",
      token
    );

    const user: any = { ...paragon.getUser() };
    if (user.authenticated && !user.integrations[integrationType]?.enabled) {
      const result = await Swal.fire({
        title: "Integration not enabled",
        text: `Would you like to enable this ${integrationType} integration? `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
      const paragonResult =   await paragon.connect(integrationType, {});

      console.log('-----paragonResult-----', paragonResult)
      }
    } else {
      return user?.integrations[integrationType];
    }
  } catch (error) {
    console.error("Error during authentication:", error);
  }
};
