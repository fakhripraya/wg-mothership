import territories from "territory-indonesia";
import { handleErrorMessage } from "./global";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  NO_DATA,
  NO_STRING,
  URL_GET_FILE,
  URL_GET_FILES,
  X_SID,
} from "../../variables/global";
import { cookies } from "../../config/cookie";

export async function handleChangeProvince(
  provinceId,
  provinceName,
  { data, initialValue },
  { setVillages, setDistricts, setRegencies, setData },
  { setErrorMessage, setModalToggle, modalToggle }
) {
  await territories
    .getRegenciesOfProvinceId(provinceId)
    .then((res) => {
      const regencies = res.map((obj) => obj.name);
      const temp = { ...data };
      temp.storeProvince = provinceName;
      temp.storeRegency = initialValue.storeRegency;
      temp.storeDistrict = NO_STRING;
      temp.storeVillage = NO_STRING;
      setVillages([]);
      setDistricts([]);
      if (regencies.length === 0) setRegencies([NO_DATA]);
      else setRegencies(regencies);
      setData(temp);
    })
    .catch((err) =>
      handleErrorMessage(
        err,
        setErrorMessage,
        setModalToggle,
        modalToggle
      )
    );
}

export async function handleChangeRegency(
  regencyId,
  regencyName,
  { data, initialValue },
  { setVillages, setDistricts, setData },
  { setErrorMessage, setModalToggle, modalToggle }
) {
  await territories
    .getDistrictsOfRegencyId(regencyId)
    .then((res) => {
      const districts = res.map((obj) => obj.name);
      const temp = { ...data };
      temp.storeRegency = regencyName;
      temp.storeDistrict = initialValue.storeDistrict;
      temp.storeVillage = NO_STRING;
      setVillages([]);
      if (districts.length === 0) setDistricts([NO_DATA]);
      else setDistricts(districts);
      setData(temp);
    })
    .catch((err) =>
      handleErrorMessage(
        err,
        setErrorMessage,
        setModalToggle,
        modalToggle
      )
    );
}

export async function handleChangeDistrict(
  districtId,
  districtName,
  { data, initialValue },
  { setVillages, setData },
  { setErrorMessage, setModalToggle, modalToggle }
) {
  await territories
    .getVillagesOfDistrictId(districtId)
    .then((res) => {
      const villages = res.map((obj) => obj.name);
      const temp = { ...data };
      temp.storeDistrict = districtName;
      temp.storeVillage = initialValue.storeVillage;
      if (villages.length === 0) setVillages([NO_DATA]);
      else setVillages(villages);
      setData(temp);
    })
    .catch((err) =>
      handleErrorMessage(
        err,
        setErrorMessage,
        setModalToggle,
        modalToggle
      )
    );
}

export async function handleShowProvinces(
  setProvinces,
  errorHandler
) {
  await territories
    .getAllProvinces()
    .then((res) => {
      const provinces = res.map((obj) => obj.name);
      setProvinces(provinces);
    })
    .catch((err) => {
      return handleErrorMessage(
        err,
        errorHandler.setErrorMessage,
        errorHandler.setModalToggle,
        errorHandler.modalToggle
      );
    });
}

export async function handleShowRegencies(
  provinceName,
  datas,
  handler,
  errorHandler
) {
  await territories
    .getProvinceByName(provinceName)
    .then(
      async (res) =>
        await handleChangeProvince(
          res.id,
          provinceName,
          datas,
          handler,
          errorHandler
        )
    )
    .catch((err) =>
      handleErrorMessage(
        err,
        errorHandler.setErrorMessage,
        errorHandler.setModalToggle,
        errorHandler.modalToggle
      )
    );
}

export async function handleShowDistrict(
  regencyName,
  datas,
  handler,
  errorHandler
) {
  await territories
    .getRegencyByName(regencyName)
    .then(
      async (res) =>
        await handleChangeRegency(
          res.id,
          regencyName,
          datas,
          handler,
          errorHandler
        )
    )
    .catch((err) =>
      handleErrorMessage(
        err,
        errorHandler.setErrorMessage,
        errorHandler.setModalToggle,
        errorHandler.modalToggle
      )
    );
}

export async function handleShowVillages(
  districtName,
  datas,
  handler,
  errorHandler
) {
  await territories
    .getDistrictByName(districtName)
    .then(
      async (res) =>
        await handleChangeDistrict(
          res.id,
          districtName,
          datas,
          handler,
          errorHandler
        )
    )
    .catch((err) =>
      handleErrorMessage(
        err,
        errorHandler.setErrorMessage,
        errorHandler.setModalToggle,
        errorHandler.modalToggle
      )
    );
}

export const getFilesFromImageUrl = async (
  service,
  fileInfo
) => {
  try {
    let targetUrl;
    targetUrl = new URL(
      `${process.env.REACT_APP_CHRONOS_SERVICE}${URL_GET_FILE}`
    );

    service.setURLParams(
      targetUrl,
      "fileId",
      JSON.stringify(fileInfo.fileId)
    );
    service.setURLParams(
      targetUrl,
      "fileName",
      JSON.stringify(fileInfo.fileName)
    );
    service.setURLParams(
      targetUrl,
      "fileType",
      JSON.stringify(fileInfo.fileType)
    );
    service.setURLParams(
      targetUrl,
      "mimeType",
      JSON.stringify(fileInfo.mimeType)
    );

    const response = await service.getData({
      headers: {
        [AUTHORIZATION]: `Bearer ${
          cookies.get(CLIENT_USER_INFO, {
            path: "/",
          }).credentialToken.accessToken
        }`,
        [X_SID]: cookies.get(CLIENT_USER_INFO, {
          path: "/",
        }).sid,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getFilesFromImagesUrl = async (
  service,
  fileInfos
) => {
  try {
    let targetUrl;
    targetUrl = new URL(
      `${process.env.REACT_APP_CHRONOS_SERVICE}${URL_GET_FILES}`
    );

    service.setURLParams(
      targetUrl,
      "fileInfos",
      JSON.stringify(fileInfos)
    );

    const response = await service.getData({
      headers: {
        [AUTHORIZATION]: `Bearer ${
          cookies.get(CLIENT_USER_INFO, {
            path: "/",
          }).credentialToken.accessToken
        }`,
        [X_SID]: cookies.get(CLIENT_USER_INFO, {
          path: "/",
        }).sid,
      },
      url: targetUrl,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
