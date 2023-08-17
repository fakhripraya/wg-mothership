export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      var floor_planner_wrapper =
        document.getElementsByClassName(
          "floor-planner-wrapper"
        );
      setSize([
        floor_planner_wrapper[0].clientWidth,
        floor_planner_wrapper[0].clientHeight,
      ]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () =>
      window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
