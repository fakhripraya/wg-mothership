import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import "./style.scss";
import Button from "../../components/Button";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
  NO_STRING,
  URL_GET_STORE_INFO,
  URL_POST_GET_USER_STORE_MEMBERSHIPS,
  X_SID,
} from "../../variables/global";
import { trackPromise } from "react-promise-tracker";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import {
  handleError500,
  handleErrorMessage,
  handleOpenModal,
} from "../../utils/functions/global";
import { useDispatch, useSelector } from "react-redux";
import { setErrorModal } from "../../utils/redux/reducers/consentScreen/consentScreenReducer";
import Modal from "../../components/Modal";
import { ShowErrorModal } from "./ModularComponents/ShowModals";
import ErrorHandling from "../ErrorHandling";
import { NO_STORE_FOUND_IN_THE_CREATIVE_STORE } from "../../variables/errorMessages/creativeStore";
import PageLoading from "../PageLoading";
import {
  IS_MEMBER_REDIRECTING_MESSAGE,
  PAGE_LOADING_MESSAGE,
} from "../../variables/constants/creativeStore";

export default function ConsentScreen() {
  // HOOKS //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosService = useAxios();
  const [searchParams] = useSearchParams();

  // STATES
  const [isRender, setRender] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    id: searchParams.get("id"),
  });
  const [errorMessage, setErrorMessage] =
    useState(NO_STRING);
  const [isMember, setIsMember] = useState(null);

  // VARIABLES //
  const login = cookies.get(CLIENT_USER_INFO);
  const defaultHeader = {
    [AUTHORIZATION]: `Bearer ${login?.credentialToken?.accessToken}`,
    [X_SID]: login?.sid,
  };

  // SELECTOR
  const errorModal = useSelector(
    (state) => state.consentScreen.errorModal
  );

  const setErrorModalToggle = (toggle) =>
    dispatch(setErrorModal(toggle));

  async function handlePostSubmitConsent() {
    if (IS_OTP_VERIFIED(login)) {
      await axiosService
        .postData({
          headers: defaultHeader,
          endpoint: process.env.REACT_APP_ZEUS_SERVICE,
          url: `${URL_POST_GET_USER_STORE_MEMBERSHIPS(
            login?.user?.userId
          )}?storeId=${storeInfo.id}`,
        })
        .then(() =>
          navigate(`/creative-store?id=${storeInfo.id}`)
        )
        .catch((error) => handleError(error));
    }
  }

  function handleError(error) {
    if (IS_NOT_AUTHENTICATE(error))
      navigate(`/creative-store?id=${storeInfo.id}`);
    if (error.responseStatus === 500) handleError500();
    else {
      handleErrorMessage(
        error,
        setErrorMessage,
        setErrorModalToggle,
        errorModal
      );
    }
  }

  useEffect(() => {
    if (IS_OTP_VERIFIED(login)) {
      axiosService
        .getDataWithOnRequestInterceptors(
          {
            headers: defaultHeader,
            endpoint: process.env.REACT_APP_ZEUS_SERVICE,
            url: `${URL_GET_STORE_INFO}?storeId=${storeInfo.id}`,
          },
          async () => {
            const result = await checkAuthAndRefresh(
              axiosService,
              cookies
            );

            if (result.responseStatus === 200) {
              const membership = await axiosService.getData(
                {
                  endpoint:
                    process.env.REACT_APP_ZEUS_SERVICE,
                  url: `${URL_POST_GET_USER_STORE_MEMBERSHIPS(
                    login?.user?.userId
                  )}?storeId=${storeInfo.id}`,
                }
              );

              // redirect if true
              if (membership.responseData.length > 0)
                setIsMember(true);
              else setIsMember(false);
            }

            return result;
          }
        )
        .then((result) => setStoreInfo(result.responseData))
        .catch((error) => handleError(error))
        .finally(() => setRender(true));
    }
  }, []);

  // Placeholder message while redirecting to home page
  if (!storeInfo.id) {
    return (
      <ErrorHandling
        errorMessage={NO_STORE_FOUND_IN_THE_CREATIVE_STORE}>
        <Button
          className="margin-top-12-18 "
          onClick={() => (window.location.href = "/")}>
          Balik ke Home
        </Button>
      </ErrorHandling>
    );
  }

  // if member, executing asynchronous call to redirect to the creative store
  if (isMember) {
    navigate(`/creative-store?id=${storeInfo.id}`);
    // Placeholder message while redirecting to the creative store
    return (
      <PageLoading
        loadingMessage={IS_MEMBER_REDIRECTING_MESSAGE}
      />
    );
  }

  if (!isRender)
    return (
      <PageLoading loadingMessage={PAGE_LOADING_MESSAGE} />
    );

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(setErrorModalToggle, errorModal)
        }
        toggle={errorModal}>
        <ShowErrorModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setErrorModalToggle}
          modalToggle={errorModal}
          errorMessage={errorMessage}
        />
      </Modal>
      <div className="consent-screen-container darker-bg-color">
        <div className="consent-screen-wrapper">
          <div className="consent-screen-center-window dark-bg-color">
            <label className="font-bold">
              Memasuki {storeInfo.storeName}
            </label>
            <div className="consent-screen-toc-container darker-bg-color margin-top-bottom-12-18">
              <p>Syarat dan Ketentuan</p>
              <span className="consent-screen-toc-textarea">
                Selamat datang di komunitas "The Creative
                Store"! Untuk memastikan lingkungan yang
                menyenangkan dan penuh dengan rasa hormat
                bagi semua anggota, harap patuhi Ketentuan
                Perilaku berikut: Hormat dan Kesopanan:
                Perlakukan sesama anggota dengan baik dan
                hormat. Diskriminasi, pelecehan, ujaran
                kebencian, atau segala bentuk intimidasi
                tidak akan ditoleransi. Pedoman Konten:
                Pastikan semua konten yang dibagikan sesuai
                dengan panduan "The Creative Store" dan
                standar komunitas. Hindari memposting konten
                eksplisit, ofensif, atau NSFW (Not Safe For
                Work). Jangan bagikan materi bajakan atau
                berhak cipta. Bahasa dan Komunikasi: Gunakan
                bahasa yang sesuai. Hindari kata-kata kasar,
                bahasa vulgar, atau lelucon yang ofensif.
                Terlibat dalam percakapan yang konstruktif
                dan bermakna. Hindari spamming, trolling,
                atau perilaku yang mengganggu. Gunakan
                saluran yang ditentukan untuk tujuan mereka.
                Diskusi di luar topik harus dialihkan ke
                saluran yang sesuai. Privasi dan Keamanan:
                Hormati privasi orang lain. Jangan bagikan
                informasi pribadi tanpa persetujuan.
                Laporkan perilaku yang mencurigakan atau
                mengkhawatirkan kepada tim moderasi segera.
                Jangan terlibat atau mempromosikan kegiatan
                yang membahayakan keamanan orang lain.
                Hormat kepada Moderator: Ikuti instruksi
                yang diberikan oleh moderator dengan segera.
                Jangan berdebat secara publik dengan
                moderator. Jika Anda memiliki kekhawatiran,
                sampaikan secara pribadi melalui pesan
                langsung. Hormati keputusan moderator,
                meskipun Anda tidak setuju. Iklan dan
                Promosi Diri: Jangan terlalu mempromosikan
                konten pribadi atau eksternal tanpa izin.
                Penawaran, iklan, atau rekrutmen untuk usaha
                atau layanan eksternal harus disetujui oleh
                tim moderasi. Akun Ganda: Gunakan hanya satu
                akun Discord per orang. Jangan menyamar
                sebagai anggota lain atau membuat beberapa
                akun untuk menghindari larangan atau
                pembatasan. Usaha Kreatif: Hormati usaha
                kreatif dan proyek yang dibagikan di dalam
                "The Creative Store." Berikan umpan balik
                konstruktif dan dukungan kepada sesama
                kreator. Jangan menjiplak atau mengklaim
                kredit untuk karya yang bukan milik Anda.
                Umpan Balik dan Saran: Berikan umpan balik
                dan saran secara konstruktif dengan hormat.
                Gunakan saluran yang ditentukan untuk
                mengirimkan umpan balik atau saran mengenai
                "The Creative Store." Kepatuhan dengan
                Pedoman Komunitas: Patuhi panduan dan
                standar komunitas "The Creative Store"
                setiap saat. Pelanggaran terhadap Ketentuan
                Perilaku ini dapat mengakibatkan peringatan,
                penangguhan sementara, pengusiran, atau
                larangan, tergantung pada tingkat
                pelanggaran dan kebijakan tim moderasi.
                Dengan berpartisipasi dalam komunitas "The
                Creative Store", Anda setuju untuk mematuhi
                Ketentuan Perilaku ini. Kegagalan untuk
                mematuhi dapat mengakibatkan tindakan
                disipliner. Terima kasih telah membantu kami
                menjaga lingkungan yang positif dan ramah
                bagi para kreator!
              </span>
            </div>
            <label>
              Dengan memasuki komunitas ini saya menyetujui
              syarat dan ketentuan yang berlaku
            </label>
            <div className="consent-screen-button-container ">
              <Button
                onClick={() =>
                  trackPromise(handlePostSubmitConsent())
                }
                className="consent-screen-button margin-top-12-18">
                Masuk
              </Button>
              <Button className="consent-screen-button margin-top-12-18 transparent-bg-color red-color">
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
