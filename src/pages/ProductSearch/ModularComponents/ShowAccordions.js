import { useCallback, useMemo } from "react";
import Accordion from "../../../components/Accordion";
import Checkbox from "../../../components/Checkbox";

const ShowAccordionsButtons = (props) =>
  useMemo(
    () => (
      <label className={`${props.className} main-color`}>
        {props.title}
      </label>
    ),
    [props.title]
  );

const ShowAccordionsCheckboxes = (props) =>
  useMemo(
    () => (
      <Checkbox
        onChange={(e) =>
          props.setDatas((oldArr) => {
            const checked = e.target.checked;
            if (checked) {
              oldArr.push({
                filter: props.filter,
                title: props.title,
              });
            } else {
              const findIndex = oldArr.findIndex(
                (item) =>
                  item.filter === props.filter &&
                  item.title === props.title
              );
              if (findIndex > -1)
                oldArr.splice(findIndex, 1);
            }
            return [...oldArr];
          })
        }
        className={props.className}
        title={props.title}
      />
    ),
    [props.title]
  );

const ShowAccordion = (props) =>
  useMemo(
    () => (
      <Accordion
        toggle={props.toggle}
        isButton={props.isButton}
        title={props.title}
        data={props.data}>
        {props.data.map((obj, index) =>
          obj.type === "BUTTON" ? (
            <ShowAccordionsButtons
              key={`accordion-${obj.title}-${index}`}
              className="product-search-accordion-button"
              title={obj.title}
              setDatas={props.setDatas}
            />
          ) : (
            <ShowAccordionsCheckboxes
              key={`accordion-${obj.title}-${index}`}
              className="product-search-accordion-button"
              title={obj.title}
              filter={props.title}
              setDatas={props.setDatas}
            />
          )
        )}
      </Accordion>
    ),
    [props.data]
  );

const ShowAccordions = (props) =>
  useCallback(
    () =>
      props.datas.map((item, index) => (
        <ShowAccordion
          key={`${props.uniqueKey}-accordion-${index}`}
          toggle={true}
          isButton={false}
          title={item.title}
          data={item.data}
          setDatas={props.setDatas}
        />
      )),
    [props.datas]
  )();

export default ShowAccordions;
