import "./style.scss";
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import Button from "../../../../../components/Button";
import { ROLE_PRESET_COLORS } from "../../../../../variables/constants/creativeStore";
import TextInput from "../../../../../components/TextInput";
import { useAxios } from "../../../../../utils/hooks/useAxios";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  LOGIN,
  URL_GET_STORE_ROLES,
  X_SID,
} from "../../../../../variables/global";
import { cookies } from "../../../../../config/cookie";
import { checkAuthAndRefresh } from "../../../../../utils/functions/middlewares";
import {
  compareSimilarValuesFromAnArray,
  handleError500,
  handleOpenOverridingHome,
} from "../../../../../utils/functions/global";
import { useSearchParams } from "react-router-dom";
import Toggle from "../../../../../components/Toggle";
import RoleSignaler from "../../../Objects/RoleSignaler";

export const ShowListOfColors = () => (
  <div className="creative-store-list-of-color-wrapped-container">
    {ROLE_PRESET_COLORS.map((val, index) => {
      return (
        <div
          key={`creative-store-list-of-color-item-${index}`}
          className="creative-store-list-of-color-item cursor-pointer"
          style={{ backgroundColor: val }}
        />
      );
    })}
  </div>
);

export const ShowListOfPermissions = (props) =>
  useMemo(
    () =>
      props.availableAccesses?.map((val, index) => (
        <div
          key={`creative-store-role-${props.selectedRole.id}-accesses-${index}`}
          className="creative-store-edit-element">
          <p className="creative-store-edit-element-item-title font-bold">
            {val.accessName}
          </p>
          <label className="creative-store-edit-element-item-description">
            {val.accessDescription}
          </label>
          <div className="creative-store-edit-element-item-tools">
            {compareSimilarValuesFromAnArray(
              val.id,
              props.selectedRole?.MasterStoreRolesAccesses,
              "accessId"
            ) ? (
              <Button className="main-bg-color">
                Enabled
              </Button>
            ) : (
              <Button className="red-bg-color">
                Disabled
              </Button>
            )}
          </div>
        </div>
      )),
    [props.availableAccesses, props.selectedRole]
  );

export const ShowListOfRoles = (props) =>
  useMemo(
    () =>
      props.availableRoles?.map(
        (val, index) =>
          val.isMutable && (
            <Fragment key={`creative-store-role-${index}`}>
              <div className="breakline" />
              <div
                onClick={() => props.setSelectedRole(val)}
                className={`creative-store-role-element ${
                  props.selectedRole.id === val.id &&
                  "main-bg-color"
                }`}>
                <span>{val.roleName}</span>
              </div>
            </Fragment>
          )
      ),
    [props.availableRoles]
  );

export const ShowPermissionTab = (props) => {
  const axiosService = useAxios();
  const [searchParams] = useSearchParams();
  const [storeId] = useState(searchParams.get("id"));
  const [roleSocket, setRoleSocket] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [availableAccesses, setAvailableAccesses] =
    useState([]);

  let roleSignaler = useMemo(() => {
    if (roleSocket) return new RoleSignaler(roleSocket);
  }, [roleSocket]);

  function handleError(error) {
    if (error.responseStatus === 500) handleError500();
    if (IS_NOT_AUTHENTICATE(error)) {
      cookies.remove(CLIENT_USER_INFO, { path: "/" });
      handleOpenOverridingHome(LOGIN);
    } else props.handleErrorMessage(error);
  }

  function handleInitialize() {
    axiosService
      .getDataWithOnRequestInterceptors(
        {
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
          endpoint: process.env.REACT_APP_ZEUS_SERVICE,
          url: `${URL_GET_STORE_ROLES(
            storeId
          )}?isWithAccesses=true&isCreativeStore=true`,
        },
        async () => {
          const result = await checkAuthAndRefresh(
            axiosService,
            cookies
          );

          return result;
        }
      )
      .then((result) => {
        setAvailableRoles(result.responseData.roles);
        setAvailableAccesses(result.responseData.accesses);

        const found = result.responseData.roles.find(
          (val) => val.isMutable === true
        );

        setSelectedRole(found);
      })
      .catch((error) => handleError(error));
  }

  function handleUpdateRoleRender(purchaseOrders) {}

  const ShowRoleEditor = () => (
    <div className="creative-store-edit-container">
      <div className="creative-store-edit-header">
        <label className="font-bold main-color">
          Edit Akses
        </label>
        <label
          onClick={() => {}}
          className="red-color cursor-pointer">
          Reset
        </label>
      </div>
      <div className="creative-store-edit-color-picker">
        <label className="font-bold margin-bottom-16">
          Nama role
        </label>
        <TextInput
          type="text"
          value={selectedRole?.roleName ?? ""}
          onChange={() => {}}
          className="margin-bottom-16 align-self-center creative-store-textinput darker-bg-color"
        />
        <label className="font-bold">Warna role</label>
        <p>
          Members use the color of the highest role they
          have on the roles list.
        </p>
        <label>Choose a color:</label>
        <div></div>
        <input
          className="creative-store-current-role-color margin-top-bottom-8 cursor-pointer"
          type="color"
          value={selectedRole.roleColorHex ?? "#000000"}
        />
        <ShowListOfColors />
        <label className="font-bold margin-top-16 margin-bottom-16">
          Semua member
        </label>
        <Toggle
          className="margin-bottom-16"
          checked={selectedRole.isEveryone}
        />
        <label className="font-bold margin-bottom-16">
          Consent screen
        </label>
        <Toggle
          className="margin-bottom-16"
          checked={selectedRole.addOnConsentScreen}
        />
        <ShowListOfPermissions
          selectedRole={selectedRole}
          availableAccesses={availableAccesses}
        />
      </div>
    </div>
  );

  const ShowNoSelectedRoleMessage = () => (
    <div className="creative-store-edit-container">
      Silahkan pilih role yang ingin diedit
    </div>
  );

  useEffect(() => {
    handleInitialize();
  }, []);

  return (
    <div className="creative-store-body-container">
      <div className="creative-store-body-header-container">
        <div className="creative-store-body-header-left">
          <h4>{"🔑︱Setting Akses"}</h4>
        </div>
      </div>
      <p className="font-bold main-color">Akses umum</p>
      <label className="margin-top-0">
        Atur <span className="main-color">akses toko</span>{" "}
        untuk member di tokomu
      </label>
      <div className="breakline" />
      <Button className="fit-width">Tambah Role</Button>
      <div
        style={{
          borderBottomLeftRadius: "1em",
          borderBottomRightRadius: "1em",
        }}
        className="creative-store-mainbody-container dark-bg-color">
        <div className="creative-store-permission">
          <div className="creative-store-role-container">
            <div className="creative-store-edit-header">
              <label className="font-bold main-color">
                Daftar Role
              </label>
            </div>
            <ShowListOfRoles
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              availableRoles={availableRoles}
            />
          </div>
          {selectedRole ? (
            <ShowRoleEditor />
          ) : (
            <ShowNoSelectedRoleMessage />
          )}
        </div>
      </div>
    </div>
  );
};
