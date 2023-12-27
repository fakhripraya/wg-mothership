export const ShowSearchText = (props) => {
  if (props.isLoading)
    return <span>Loading bentar...</span>;
  else if (
    props.searchedProductsLength ===
      props.searchedProductsMasterCount &&
    props.searchedProductsMasterCount > 0
  )
    return (
      <span>
        Kita udah tampilin semua produk berdasarkan kriteria
        pencarian kamu nih, totalnya ada{" "}
        <strong>
          {props.searchedProductsMasterCount} produk !
        </strong>
      </span>
    );
  else if (
    props.searchedProductsLength !==
      props.searchedProductsMasterCount &&
    props.searchedProductsMasterCount > 0
  )
    return (
      <span>
        Kita tampilin 1 - {props.searchedProductsLength}{" "}
        produk dari {props.searchedProductsMasterCount} dulu
        ya, kalau mau liat lagi pencet{" "}
        <strong>Lihat lebih</strong> aja !
      </span>
    );
  else
    return (
      // this should return only if searchedProductsLength = searchedProductsMasterCount = 0
      <span>
        Wah maaf nih kayanya itemnya belum ada, coba dicari
        lagi dengan kriteria yang berbeda !
      </span>
    );
};
