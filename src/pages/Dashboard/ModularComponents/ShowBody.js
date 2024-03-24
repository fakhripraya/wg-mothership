import Button from "../../../components/Button";
import ErrorHandling from "../../ErrorHandling";
import PageLoading from "../../PageLoading";
import { NO_STORE_FOUND_IN_THE_DASHBOARD } from "../../../variables/errorMessages/dashboard";

export const ShowLoadingComponent = () => (
  <PageLoading
    containerStyle={{ width: "auto" }}
    loadingMessage={"Loading bentar..."}
    noLogo={true}
  />
);

export const ShowErrorComponent = (props) => (
  <ErrorHandling
    containerStyle={{
      width: "auto",
      maxHeight: "768px",
    }}
    errorMessage={NO_STORE_FOUND_IN_THE_DASHBOARD}>
    <Button
      className="margin-top-12-18"
      onClick={() => props.handleGoToAddStore()}>
      Buat toko
    </Button>
  </ErrorHandling>
);
