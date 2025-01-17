"use server";
import { apiClient } from "@/services";

export const getBeneficiary = async (beneficiaryId: string): Promise<any> => {
  try {
    const beneficiary = await apiClient.GET(
      `api/persons/findPersonAffiliatesWithDetails/${beneficiaryId}`,
    );
    const statusCode = beneficiary.status;
    const responseData = await beneficiary.json();

    if (statusCode >= 400) {
      return {
        error: true,
        message: responseData.message,
        notFound: true,
      };
    }
    if (statusCode == 200) {
      return {
        error: false,
        message: "Datos de la persona obtenido exitosamente",
        data: responseData,
      };
    }
  } catch (e: any) {
    console.error(e);

    return {
      error: true,
      message: "Error al obtener datos de la persona",
    };
  }
};

export const getAffiliate = async (affiliateId: string): Promise<any> => {
  try {
    const affiliate = await apiClient.GET(`api/affiliates/${affiliateId}`);
    const statusCode = affiliate.status;
    const responseData = await affiliate.json();

    if (statusCode >= 400) {
      return {
        error: true,
        message: responseData.message,
      };
    }
    if (statusCode == 200) {
      return {
        error: false,
        message: "Datos del afiliado obtenido exitosamente",
        data: responseData,
      };
    }
  } catch (e: any) {
    console.error(e);

    return {
      error: true,
      message: "Error al obtener datos del afiliado",
    };
  }
};

export const obtainAffiliateDocuments = async (affiliateId: string): Promise<any> => {
  try {
    const documents = await apiClient.GET(`api/affiliates/${affiliateId}/documents`);
    const statusCode = documents.status;
    const responseData = await documents.json();

    if (statusCode >= 400) {
      return {
        error: true,
        message: responseData.message,
      };
    }
    if (statusCode == 200) {
      return {
        error: false,
        message: "Get affiliate successful",
        data: responseData,
      };
    }
    const data = await documents.json();

    return data;
  } catch (e: any) {
    console.error(e);

    return {
      error: true,
      message: "Error al obtener los documentos del afiliado",
    };
  }
};

export const getAllDocuments = async (): Promise<any> => {
  try {
    const allDocuments = await apiClient.GET("api/procedure-documents");
    const statusCode = allDocuments.status;
    const responseData = await allDocuments.json();

    if (statusCode >= 400) {
      return {
        error: true,
        message: responseData.message,
      };
    }
    if (statusCode == 200) {
      return {
        error: false,
        message: "Documentos obtenidos exitosamente",
        data: responseData,
      };
    }
    const { data } = await allDocuments.json();

    return data;
  } catch (e: any) {
    console.error(e);

    return {
      error: true,
      message: "Error al obtener los todos los documentos.",
    };
  }
};
