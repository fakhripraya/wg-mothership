import territories from "territory-indonesia";
import { handleErrorMessage } from "./global";
import { NO_DATA, NO_STRING } from "../../variables/global";

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
