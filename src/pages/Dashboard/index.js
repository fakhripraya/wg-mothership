import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import "./style.scss";
import Dropdown from "../../components/DynamicDropdown";
import {
  getURLParams,
  handleError500,
  handleErrorMessage,
  handleOpenModal,
  handleOpenOverridingHome,
  setURLParams,
  smoothScrollTop,
} from "../../utils/functions/global";
import FloatButton from "../../components/FloatButton";
import BottomSheet from "../../components/BottomSheet";
import DashboardHome from "../DashboardHome";
import DashboardCatalogue from "../DashboardCatalogue";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  DASHBOARD_CATALOG,
  DASHBOARD_REMINDERS,
  DASHBOARD_HOME,
  DASHBOARD_TRANSACTIONS,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
  LOGIN,
  NO_DATA,
  URL_GET_DASHBOARD_STORES,
  X_SID,
  LOADING,
} from "../../variables/global";
import DashboardTransaction from "../DashboardTransaction";
import DashboardChat from "../DashboardChat";
import Avatar from "react-avatar";
import { LOGIN_PAGE_REDIRECTING_MESSAGE } from "../../variables/errorMessages/dashboard";
import { useAxios } from "../../utils/hooks/useAxios";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { STORE_INITIAL_VALUE } from "../../variables/initial/store";
import { cookies } from "../../config/cookie";
import PageLoading from "../PageLoading";
import Modal from "../../components/Modal";
import { ShowErrorModal } from "./ModularComponents/ShowModal";
import {
  ShowErrorComponent,
  ShowLoadingComponent,
} from "./ModularComponents/ShowBody";

export default function Dashboard() {
  // VARIABLES //
  let login = cookies.get(CLIENT_USER_INFO);
  const currentLocation = new URL(document.location);
  const storeId = getURLParams(currentLocation, "storeId");
  const currentTab = getURLParams(currentLocation, "tab");

  // HOOKS //
  const zeusService = useAxios();

  // STATES //
  const [userStore, setUserStores] = useState(null);
  const [
    selectedStoreUserRoles,
    setSelectedStoreUserRoles,
  ] = useState(null);
  const [selectedStore, setSelectedStore] = useState(
    STORE_INITIAL_VALUE
  );
  const [toggle, setToggle] = useState(false);
  const [toggleOpenBody, setToggleOpenBody] = useState(
    currentTab || DASHBOARD_HOME
  );
  const [errorModalToggle, setErrorModalToggle] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // FUNCTIONS
  function handleInitialize() {
    zeusService
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
          url: URL_GET_DASHBOARD_STORES(login.user.userId),
        },
        async () => {
          const result = await checkAuthAndRefresh(
            zeusService,
            cookies
          );
          if (result.responseStatus === 200)
            login = cookies.get(CLIENT_USER_INFO);
          return result;
        }
      )
      .then((result) => {
        // if status is not 200 return, even if the response has status 304
        if (result.responseStatus !== 200) return;
        setUserStores(result.responseData);
        // if fetched stores is empty, create a placeholder object
        if (result.responseData.length <= 0) {
          let temp = { ...selectedStore };
          temp.storeName = "Buat Toko";
          setSelectedStore(temp);
        } else {
          // find store by id from the parameter
          const storeFind =
            result.responseData.find(
              (val) => val.id === storeId
            ) || result.responseData[0];
          // set the store to be the current selected store
          setSelectedStore(storeFind);
          setSelectedStoreUserRoles(() =>
            handleCurrentStoreRoleMapping(storeFind)
          );
        }
      })
      .catch((error) => {
        if (error.responseStatus === 500) handleError500();
        if (IS_NOT_AUTHENTICATE(error)) {
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
          handleOpenOverridingHome(LOGIN);
        } else
          handleErrorMessage(
            error,
            setErrorMessage,
            setErrorModalToggle,
            errorModalToggle
          );
      });
  }

  function handleCurrentStoreRoleMapping(store) {
    return store.MasterStoreRoles?.reduce((acc, role) => {
      acc[role.id] = role.MasterStoreRolesAccesses?.reduce(
        (sAcc, access) => {
          if (access.MasterAccess)
            sAcc[access.MasterAccess.id] =
              access.MasterAccess;
          return sAcc;
        },
        {}
      );
      return acc;
    }, {});
  }

  function handleOpenModalError() {
    handleOpenModal(setErrorModalToggle, errorModalToggle);
  }

  function handleBottomSheet() {
    setToggle(!toggle);
  }

  function handleOpenPage(keyword) {
    setToggleOpenBody(keyword);
    setURLParams(currentLocation, "tab", keyword);
  }

  function handleOpenPageMobile(keyword) {
    setToggleOpenBody(keyword);
    setURLParams(currentLocation, "tab", keyword);
    handleBottomSheet();
  }

  function handleGoToAddStore() {
    window.location.href = `/dashboard/add/store?prevStore=${
      selectedStore?.id
    }&prevTab=${currentTab || DASHBOARD_HOME}`;
  }

  function showUserStores(userStores) {
    if (!login) return [LOADING];
    if (!userStores) return [LOADING];
    if (userStores.length <= 0) return [NO_DATA];
    else return userStores.map((obj) => obj.storeName);
  }

  function handleSelectedStoreChange(value) {
    const result = userStore.find(
      (obj) => obj.storeName === value
    );

    let targetStoreId = "";
    setSelectedStore(() => {
      // if result has no value
      if (!result && userStore) {
        targetStoreId = userStore[0].id;
        return userStore[0].storeName;
      } else if (!result)
        return STORE_INITIAL_VALUE.storeName;
      // if result has value
      targetStoreId = result.id;
      setSelectedStoreUserRoles(() =>
        handleCurrentStoreRoleMapping(result)
      );
      return result;
    });
    setURLParams(currentLocation, "storeId", targetStoreId);
  }

  // COMPONENT FUNCTIONS //
  // These components will re-render depending on the parent
  const ShowDashboardComponent = () => (
    <Fragment>
      <DashboardHome
        toggleOpen={toggleOpenBody}
        toggleOpenHandler={setToggleOpenBody}
        data={{
          selectedStore: selectedStore,
        }}
      />
      <DashboardCatalogue
        toggleOpen={toggleOpenBody}
        data={{
          selectedStore: selectedStore,
        }}
      />
      <DashboardTransaction toggleOpen={toggleOpenBody} />
      <DashboardChat toggleOpen={toggleOpenBody} />
    </Fragment>
  );

  // EXECUTION AFTER RENDER
  useEffect(() => {
    // scroll to top on entering
    smoothScrollTop();
    // dashboard initialization
    if (IS_OTP_VERIFIED(login)) handleInitialize();
  }, []);

  if (!IS_OTP_VERIFIED(login)) {
    // Executing asynchronous call for redirecting to home page
    handleOpenOverridingHome(LOGIN);
    // Placeholder message while redirecting to home page
    return (
      <PageLoading
        loadingMessage={LOGIN_PAGE_REDIRECTING_MESSAGE}
      />
    );
  }

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalError}
        toggle={errorModalToggle}>
        <ShowErrorModal
          errorMessage={errorMessage}
          handleOpenModalError={handleOpenModalError}
        />
      </Modal>
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="dashboard-flex-container">
            <div className="dashboard-tools-container">
              <Avatar
                style={{ cursor: "pointer" }}
                size={"60px"}
                round={true}
                title={login.user.fullName}
                name={login.user.fullName}
              />
              <FloatButton
                onClick={() =>
                  handleOpenPage(DASHBOARD_HOME)
                }
                className="dashboard-menu-button dashboard-menu-button-home"
              />
              <FloatButton
                onClick={() =>
                  handleOpenPage(DASHBOARD_TRANSACTIONS)
                }
                className="dashboard-menu-button dashboard-menu-button-order"
              />
              <FloatButton
                onClick={() =>
                  handleOpenPage(DASHBOARD_REMINDERS)
                }
                className="dashboard-menu-button dashboard-menu-button-chat"
              />
              <FloatButton
                onClick={() =>
                  handleOpenPage(DASHBOARD_CATALOG)
                }
                className="dashboard-menu-button dashboard-menu-button-product"
              />
            </div>
            <div className="dashboard-cards-container">
              <div className="dashboard-cards-header">
                <div className="dashboard-cards-tool-items">
                  <FloatButton
                    onClick={() => handleBottomSheet()}
                    className="dashboard-menu-button display-mobile dashboard-menu-button-main"
                  />
                  <p style={{ fontSize: "1.25em" }}>
                    Hello, {login.user.fullName}
                  </p>
                </div>
                <div className="dashboard-cards-tool-items">
                  <FloatButton className="dashboard-menu-button dashboard-menu-button-no-complaint" />
                  <FloatButton className="dashboard-menu-button dashboard-menu-button-bell" />
                  <Dropdown
                    title="Toko : "
                    onChange={(value) =>
                      handleSelectedStoreChange(value)
                    }
                    style={{
                      width: "100px",
                      maxWidth: "100px",
                    }}
                    showTitle={true}
                    toggle={true}
                    value={
                      selectedStore?.storeName || LOADING
                    }
                    values={showUserStores(userStore)}
                  />
                  <FloatButton
                    onClick={() => handleGoToAddStore()}
                    className="dashboard-menu-button dashboard-menu-button-plus"
                  />
                </div>
              </div>
              {!userStore && <ShowLoadingComponent />}
              {login && userStore?.length <= 0 && (
                <ShowErrorComponent
                  handleGoToAddStore={handleGoToAddStore}
                />
              )}
              {login && userStore?.length > 0 && (
                <ShowDashboardComponent
                  toggleOpenBody={toggleOpenBody}
                  setToggleOpenBody={setToggleOpenBody}
                  selectedStore={selectedStore}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomSheet
        toggle={toggle}
        clicked={handleBottomSheet}>
        <div className="dashboard-mobile-menu-container">
          <Avatar
            style={{ cursor: "pointer" }}
            size={"60px"}
            round={true}
            title={login.user.fullName}
            name={login.user.fullName}
          />
          <FloatButton
            onClick={() =>
              handleOpenPageMobile(DASHBOARD_HOME)
            }
            className="dashboard-menu-button dashboard-menu-button-home margin-top-bottom-12-18"
          />
          <FloatButton
            onClick={() =>
              handleOpenPageMobile(DASHBOARD_TRANSACTIONS)
            }
            className="dashboard-menu-button dashboard-menu-button-order margin-top-bottom-12-18"
          />
          <FloatButton
            onClick={() =>
              handleOpenPageMobile(DASHBOARD_REMINDERS)
            }
            className="dashboard-menu-button dashboard-menu-button-chat margin-top-bottom-12-18"
          />
          <FloatButton
            onClick={() =>
              handleOpenPageMobile(DASHBOARD_CATALOG)
            }
            className="dashboard-menu-button dashboard-menu-button-product margin-top-bottom-12-18"
          />
        </div>
      </BottomSheet>
    </Fragment>
  );
}
